import type {
  AttributeInput,
  CartLineInput,
  CartLineUpdateInput,
} from "./types/storefront.types";

import uniq from "lodash.uniq";
import merge from "lodash.merge";
import { createEffect, createSignal, observable, on } from "solid-js";
import { unwrap } from "solid-js/store";
import { makePersisted } from "@solid-primitives/storage";

import client from "./lib/client";
import convertCartStructToREST from "./lib/utils/convertCartStructToREST";
import formatId from "./lib/utils/formatId";
import makeObservablePromise from "./lib/utils/makeObservablePromise";
import createCartCookie from "./lib/utils/createCartCookie";
import { handleNoRESTCart } from "./lib/fetchers";
import {
  getCartQuery,
  // addItemsToCartMutation as addItemsToCartMutationGQL,
  removeItemsFromCartMutation as removeItemsFromCartMutationGQL,
  updateItemsInCartMutation as updateItemsInCartMutationGQL,
  updateCartNoteMutation as updateCartNoteMutationGQL,
  updateCartDiscountCodesMutation as updateCartDiscountCodesMutationGQL,
  updateCartAttributesMutation as updateCartAttributesMutationGQL,
} from "./lib/queries";
import { CART_QUERY_KEY } from "./lib/const";
import { AJAX } from "./lib/ajax";

// @ts-ignore
if (!window.Shopify) window.Shopify = {};

class CartError extends Error {
  type: string;
  constructor({ type, message = "" }: { type: string; message: string }) {
    super(message);
    this.type = type;
  }
}

class CartNotFoundError extends CartError {
  constructor() {
    super({ message: "Could not find your cart!", type: "NotFound" });
  }
}

export type CartData = ReturnType<typeof convertCartStructToREST> | undefined;

function publishEvent<T extends object>(eventName: string, data: T) {
  const actualEventName = `storefront_cart:${eventName}`;
  window.dispatchEvent(new CustomEvent(actualEventName, { detail: data }));
  if (!Shopify.analytics) return false;
  return Shopify.analytics.publish(actualEventName, data);
}

const StorefrontCart = (function () {
  const [cartId, setCartId] = createCartCookie();
  const [discounts, setDiscounts] = makePersisted(createSignal<string[]>([]), {
    name: "discounts",
    serialize: (value) => JSON.stringify(value),
    deserialize: (value) => JSON.parse(value),
  });
  const queryClient = client.useQueryClient();
  const getCartQueryKey = () => [CART_QUERY_KEY, { id: cartId() }] as const;

  const cartQuery = client.createQuery(() => ({
    queryKey: [...getCartQueryKey()] as const,
    queryFn: async ({ queryKey, signal }) => {
      const [_, variables] = queryKey;
      const id = variables.id;
      if (!id) return undefined;

      let res = await client.query({
        query: getCartQuery,
        variables: {
          id,
        },
        signal,
      });

      if (!res?.data?.cart && res?.data?.cart !== null) {
        throw new CartNotFoundError();
      }

      if (!res.data.cart) return undefined;

      return convertCartStructToREST(res.data.cart);
    },
    initialData: undefined,
    throwOnError: false,
    reconcile: "cartQuery",
    staleTime: 60,
    enabled({ queryKey }) {
      const [_, variables] = queryKey;
      if (!variables.id) return false;
      return true;
    },
  }));

  function defaultUnwrap<T>(cart: CartData | undefined): T {
    return cart as unknown as T; // Use unknown as intermediary to satisfy TypeScript
  }

  function subscribe<T>(
    cb: (data: T) => void,
    unwrapValue: (cart: CartData | undefined) => T = defaultUnwrap
  ): () => void {
    // Assuming cartQuery and observable are defined and set correctly.
    const observer = observable(() => unwrapValue(cartQuery?.data));
    return observer.subscribe(cb).unsubscribe;
  }

  const getCartData = () =>
    queryClient.getQueryData<CartData>(getCartQueryKey());
  const setCartData = (cb: (data: CartData) => CartData) =>
    queryClient.setQueryData<CartData>(getCartQueryKey(), cb);
  const cancelCartQuery = async () =>
    queryClient.cancelQueries({ queryKey: getCartQueryKey() });
  const invalidateCartQuery = () =>
    queryClient.invalidateQueries({ queryKey: getCartQueryKey() });

  createEffect(
    on(
      () => cartQuery.error,
      (error) => {
        if (error instanceof CartNotFoundError === false) return;
        return handleNoRESTCart().then(setCartId);
      }
    )
  );

  const addItemsToCartMutation = client.createMutation(() => ({
    mutationFn: async (lines: CartLineInput[]) => {
      const ajaxLines = lines.map((line) => ({
        id: line.merchandiseId,
        quantity: line.quantity!,
        selling_plan: line.sellingPlanId || undefined,
        properties: (line.attributes || []).reduce(
          (props, attr) => ({
            ...props,
            [attr.key]: attr.value,
          }),
          {}
        ),
      }));
      return await AJAX.add.items(ajaxLines);
    },
    async onSuccess(_, lines) {
      await invalidateCartQuery();
      const restCart = getCartData();
      const addedItems = restCart?.items.reduce(
        (addedItems, line) => {
          const item = lines.find((item) => {
            let result =
              item.merchandiseId.toString() === line.variant_id.toString();
            if (!result) return false;
            if (item.sellingPlanId && line.selling_plan)
              result = item.sellingPlanId === line.selling_plan.id;
            if (!result) return false;
            if (item.attributes && line.attributes) {
              result = item.attributes.every((attr) =>
                line.attributes.some(
                  (a) => a.key === attr.key && a.value === attr.value
                )
              );
            }

            return result;
          });
          if (item) return [...addedItems, line];
          return addedItems;
        },
        [] as typeof restCart.items
      );

      publishEvent("items_added", { items: addedItems });
    },
    onError() {
      invalidateCartQuery();
    },
  }));

  const removeItemsFromCartMutation = client.createMutation(() => ({
    mutationFn: async (lineIds: string[]) => {
      lineIds = lineIds.map((id) => formatId(id, "CartLine"));
      return makeObservablePromise(cartId, async (cartId) => {
        const req = await client.query({
          query: removeItemsFromCartMutationGQL,
          variables: {
            id: cartId!,
            lineIds,
          },
        });
        if ((req?.data?.cartLinesRemove?.userErrors || []).length > 0)
          throw req.data?.cartLinesRemove?.userErrors;
        if (!req?.data?.cartLinesRemove?.cart)
          throw new Error("Could not remove line items from cart");
        return req.data.cartLinesRemove.cart;
      });
    },
    onMutate: async (lineIds) => {
      await cancelCartQuery();

      const previousCart = getCartData();

      setCartData((oldCart) => {
        if (!oldCart) return undefined;
        return {
          ...oldCart,
          item_count: oldCart.items
            .filter((item) => !lineIds.includes(item.key))
            .reduce((total, item) => total + item.quantity, 0),
          items: oldCart.items.filter((item) => {
            return !lineIds.includes(item.id);
          }),
        };
      });

      return { previousCart };
    },
    onError: (_, __, context) => {
      if (!context?.previousCart) return;
      setCartData(() => context.previousCart);
    },
    onSuccess(_, lines) {
      const cart = getCartData();
      const removedLines = cart?.items?.reduce(
        (removedItems, line) => {
          const item = lines.find((item) => line.key === item);
          if (item) return [...removedItems, line];
          return removedItems;
        },
        [] as typeof cart.items
      );

      publishEvent("items_removed", { items: removedLines });
    },
    onSettled() {
      invalidateCartQuery();
    },
  }));

  const updateItemsInCartMutation = client.createMutation(() => ({
    mutationFn: async (newLines: CartLineUpdateInput[]) => {
      newLines = newLines.map((line) => ({
        id: formatId(line.id, "CartLine"),
        quantity: line.quantity,
        attributes: line.attributes || undefined,
        merchandiseId: line.merchandiseId
          ? formatId(line.merchandiseId, "ProductVariant")
          : undefined,
        sellingPlanId:
          line.sellingPlanId === null
            ? null
            : line.sellingPlanId
              ? formatId(line.sellingPlanId, "SellingPlan")
              : undefined,
      }));
      return makeObservablePromise(cartId, async (cartId) => {
        const req = await client.query({
          query: updateItemsInCartMutationGQL,
          variables: {
            id: cartId!,
            lines: newLines,
          },
        });
        if ((req?.data?.cartLinesUpdate?.userErrors || []).length > 0)
          throw req.data?.cartLinesUpdate?.userErrors;
        if (!req?.data?.cartLinesUpdate?.cart)
          throw new Error("Could not update items in cart");
        return req.data.cartLinesUpdate.cart;
      });
    },
    onMutate: async (lines) => {
      await cancelCartQuery();

      const previousCart = getCartData();

      setCartData((oldCart) => {
        if (!oldCart) return undefined;
        return {
          ...oldCart,
          item_count: oldCart.items.reduce((total, item) => {
            const index = lines.findIndex((i) => i.id === item.key);
            if (index === -1) return total + item.quantity;
            return total + (lines[index].quantity || item.quantity);
          }, 0),
          items: oldCart.items
            .map((item) => {
              const index = lines.findIndex((i) => i.id === item.key);
              if (index === -1) return item;
              return {
                ...item,
                quantity: lines[index].quantity || item.quantity,
              };
            })
            .filter((item) => item.quantity > 0),
        };
      });

      return { previousCart };
    },
    onError: (_, __, context) => {
      if (!context?.previousCart) return;
      setCartData(() => context.previousCart);
    },
    onSuccess(cart, lines) {
      const restCart = convertCartStructToREST(cart);
      const updatedItems = restCart?.items.reduce(
        (updatedItems, line) => {
          const item = lines.find((item) => item.id === line.key);
          if (item) return [...updatedItems, line];
          return updatedItems;
        },
        [] as typeof restCart.items
      );

      publishEvent("items_updated", { items: updatedItems });
    },
    onSettled: () => {
      invalidateCartQuery();
    },
  }));

  const updateCartNoteMutation = client.createMutation(() => ({
    mutationFn: async (note: string) => {
      return makeObservablePromise(cartId, async (cartId) => {
        const req = await client.query({
          query: updateCartNoteMutationGQL,
          variables: {
            id: cartId!,
            note,
          },
        });
        if ((req?.data?.cartNoteUpdate?.userErrors || []).length > 0)
          throw req.data?.cartNoteUpdate?.userErrors;
        if (!req?.data?.cartNoteUpdate?.cart)
          throw new Error("Could not update cart note");
        return req.data.cartNoteUpdate.cart;
      });
    },
    onMutate: async (note) => {
      await cancelCartQuery();

      const previousCart = getCartData();

      setCartData((oldCart) => {
        if (!oldCart) return undefined;
        return {
          ...oldCart,
          note,
        };
      });
      return { previousCart };
    },
    onError: (_, __, context) => {
      if (!context?.previousCart) return;
      setCartData(() => context.previousCart);
    },
    onSuccess(_, note) {
      publishEvent("cart_note_updated", { note });
    },
    onSettled: () => {
      invalidateCartQuery();
    },
  }));

  const updateCartAttributes = client.createMutation(() => ({
    mutationFn: async (attributes: AttributeInput[]) => {
      return makeObservablePromise(cartId, async (cartId) => {
        const req = await client.query({
          query: updateCartAttributesMutationGQL,
          variables: {
            id: cartId!,
            attributes,
          },
        });
        if ((req?.data?.cartAttributesUpdate?.userErrors || []).length > 0)
          throw req.data?.cartAttributesUpdate?.userErrors;
        if (!req?.data?.cartAttributesUpdate?.cart)
          throw new Error("Could not update cart attributes");
        return req.data.cartAttributesUpdate.cart;
      });
    },
    onMutate: async (attributes) => {
      await cancelCartQuery();

      const previousCart = getCartData();

      setCartData((oldCart) => {
        if (!oldCart) return undefined;
        return {
          ...oldCart,
          attributes: merge(oldCart.attributes, attributes),
        };
      });
      return { previousCart };
    },
    onError: (_, __, context) => {
      if (!context?.previousCart) return;
      setCartData(() => context.previousCart);
    },
    onSuccess(_, attributes) {
      publishEvent("cart_attributes_updated", { attributes: [...attributes] });
    },
    onSettled: () => {
      invalidateCartQuery();
    },
  }));

  const addCartDiscountCodeMutation = client.createMutation(() => ({
    mutationFn: async (discountCode: string) => {
      const codes = uniq([...discounts(), discountCode]);
      const cart = await makeObservablePromise(cartId, async (cartId) => {
        const req = await client.query({
          query: updateCartDiscountCodesMutationGQL,
          variables: {
            id: cartId!,
            discountCodes: codes,
          },
        });
        if ((req?.data?.cartDiscountCodesUpdate?.userErrors || []).length > 0)
          throw req.data?.cartDiscountCodesUpdate?.userErrors;
        if (!req?.data?.cartDiscountCodesUpdate?.cart)
          throw new Error("Could not add discount code to cart");
        return req.data.cartDiscountCodesUpdate.cart;
      });

      const newCodes = cart?.discountCodes || [];

      const applied = newCodes.some(
        (code) => code.applicable && code.code === discountCode
      );

      if (!applied) throw new Error("Discount code is invalid!");

      publishEvent("discount_applied", { discountCode });
      setDiscounts(uniq(newCodes.map((c) => c.code)));
      return;
    },
    onSettled: () => {
      invalidateCartQuery();
    },
  }));

  const removeCartDiscountCodeMutation = client.createMutation(() => ({
    mutationFn: async (discountCode: string) => {
      const codes = discounts().filter((code) => code !== discountCode);
      return makeObservablePromise(cartId, async (cartId) => {
        const req = await client.query({
          query: updateCartDiscountCodesMutationGQL,
          variables: {
            id: cartId!,
            discountCodes: codes,
          },
        });
        if ((req?.data?.cartDiscountCodesUpdate?.userErrors || []).length > 0)
          throw req.data?.cartDiscountCodesUpdate?.userErrors;
        if (!req?.data?.cartDiscountCodesUpdate?.cart)
          throw new Error("Could not remove discount code");
        publishEvent("discount_removed", { discountCode });
        return req.data.cartDiscountCodesUpdate.cart;
      });
    },
    onMutate: async (discountCode) => {
      await cancelCartQuery();

      const previousCart = getCartData();

      setCartData((oldCart) => {
        if (!oldCart) return undefined;
        return {
          ...oldCart,
          discountCodes: oldCart.discountCodes.filter(
            (code) => code.code !== discountCode
          ),
        };
      });

      return { previousCart };
    },

    onError: (_, __, context) => {
      if (!context?.previousCart) return;
      setCartData(() => context.previousCart);
    },
    onSuccess: (cart) => {
      const codes = cart?.discountCodes || [];

      setDiscounts(codes.map((c) => c.code));
    },
    onSettled: () => {
      invalidateCartQuery();
    },
  }));

  return {
    cart() {
      return cartQuery.data;
    },
    get error() {
      return cartQuery.error;
    },
    get status() {
      return cartQuery.status;
    },
    get isError() {
      return cartQuery.isError;
    },
    get isFetched() {
      return cartQuery.isFetched;
    },
    get isFetching() {
      return cartQuery.isFetching;
    },
    get isFetchedAfterMount() {
      return cartQuery.isFetchedAfterMount;
    },
    get isInitialLoading() {
      return cartQuery.isInitialLoading;
    },
    get isLoading() {
      return cartQuery.isLoading;
    },
    get isLoadingError() {
      return cartQuery.isLoadingError;
    },
    get isPaused() {
      return cartQuery.isPaused;
    },
    get isPending() {
      return cartQuery.isPending;
    },
    get isPlaceholderData() {
      return cartQuery.isPlaceholderData;
    },
    get isRefetchError() {
      return cartQuery.isRefetchError;
    },
    get isRefetching() {
      return cartQuery.isRefetching;
    },
    get isStale() {
      return cartQuery.isStale;
    },
    get isSuccess() {
      return cartQuery.isSuccess;
    },
    subscribe,
    refetchCart: cartQuery.refetch,
    addItem: (
      item: CartLineInput,
      options: Parameters<typeof addItemsToCartMutation.mutateAsync>[1]
    ) => addItemsToCartMutation.mutateAsync([item], options),
    addItems: (
      items: CartLineInput[],
      options: Parameters<typeof addItemsToCartMutation.mutateAsync>[1]
    ) => addItemsToCartMutation.mutateAsync(items, options),
    removeItems: (
      ids: string[],
      options: Parameters<typeof removeItemsFromCartMutation.mutateAsync>[1]
    ) => removeItemsFromCartMutation.mutateAsync(ids, options),
    removeItem: (
      id: string,
      options: Parameters<typeof removeItemsFromCartMutation.mutateAsync>[1]
    ) => removeItemsFromCartMutation.mutateAsync([id], options),
    updateItems: (
      items: CartLineUpdateInput[],
      options: Parameters<typeof updateItemsInCartMutation.mutateAsync>[1]
    ) => updateItemsInCartMutation.mutateAsync(items, options),
    updateItem: (
      item: CartLineUpdateInput,
      options: Parameters<typeof updateItemsInCartMutation.mutateAsync>[1]
    ) => updateItemsInCartMutation.mutateAsync([item], options),
    updateNote: (
      note: string,
      options: Parameters<typeof updateCartNoteMutation.mutateAsync>[1]
    ) => updateCartNoteMutation.mutateAsync(note, options),
    updateAttributes: (
      attributes: AttributeInput[],
      options: Parameters<typeof updateCartAttributes.mutateAsync>[1]
    ) => updateCartAttributes.mutateAsync(attributes, options),
    updateAttribute: (
      attribute: AttributeInput,
      options: Parameters<typeof updateCartAttributes.mutateAsync>[1]
    ) => updateCartAttributes.mutateAsync([attribute], options),
    addDiscountCode: (
      discountCode: string,
      options: Parameters<typeof addCartDiscountCodeMutation.mutateAsync>[1]
    ) => addCartDiscountCodeMutation.mutateAsync(discountCode, options),
    removeDiscountCode: (
      discountCode: string,
      options: Parameters<typeof removeCartDiscountCodeMutation.mutateAsync>[1]
    ) => removeCartDiscountCodeMutation.mutateAsync(discountCode, options),
  };
})();

if (window.Shopify.storefrontConfig.debug) {
  createEffect(on(StorefrontCart.cart, (cart) => console.log(unwrap(cart))));
}

export default StorefrontCart;

if (!window.Shopify.StorefrontCart)
  window.Shopify.StorefrontCart = StorefrontCart;

declare global {
  export interface Shopify {
    StorefrontCart: typeof StorefrontCart;
    analytics?: {
      publish: <T extends object>(eventName: string, eventData: T) => boolean;
    };
  }
}
