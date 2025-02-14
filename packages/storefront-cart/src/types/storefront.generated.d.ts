/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import type * as StorefrontTypes from './storefront.types';

export type CartFragmentFragment = (
  Pick<StorefrontTypes.Cart, 'id' | 'checkoutUrl' | 'note' | 'totalQuantity'>
  & { attributes: Array<Pick<StorefrontTypes.Attribute, 'key' | 'value'>>, cost: { subtotalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, discountAllocations: Array<{ discountedAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }>, discountCodes: Array<Pick<StorefrontTypes.CartDiscountCode, 'applicable' | 'code'>>, lines: { pageInfo: Pick<StorefrontTypes.PageInfo, 'hasNextPage' | 'hasPreviousPage' | 'startCursor' | 'endCursor'>, nodes: Array<(
      Pick<StorefrontTypes.CartLine, 'id' | 'quantity'>
      & { attributes: Array<Pick<StorefrontTypes.Attribute, 'key' | 'value'>>, cost: { amountPerQuantity: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, compareAtAmountPerQuantity?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>>, subtotalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, discountAllocations: Array<{ discountedAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }>, sellingPlanAllocation?: StorefrontTypes.Maybe<{ sellingPlan: Pick<StorefrontTypes.SellingPlan, 'id' | 'name'> }>, variant: (
        { __typename: 'ProductVariant' }
        & Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'quantityAvailable' | 'availableForSale' | 'currentlyNotInStock' | 'requiresShipping' | 'sku'>
        & { selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, 'name' | 'value'>>, product: (
          Pick<StorefrontTypes.Product, 'id' | 'title' | 'handle' | 'onlineStoreUrl'>
          & { featuredImage?: StorefrontTypes.Maybe<(
            Pick<StorefrontTypes.Image, 'altText' | 'height' | 'id' | 'width'>
            & { thumbnail: StorefrontTypes.Image['url'], small: StorefrontTypes.Image['url'], large: StorefrontTypes.Image['url'], original: StorefrontTypes.Image['url'] }
          )>, options: Array<Pick<StorefrontTypes.ProductOption, 'name' | 'values'>>, sellingPlanGroups: { nodes: Array<{ sellingPlans: { nodes: Array<Pick<StorefrontTypes.SellingPlan, 'id' | 'name'>> } }> }, variants: { nodes: Array<Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'availableForSale'>> } }
        ), image?: StorefrontTypes.Maybe<(
          Pick<StorefrontTypes.Image, 'altText' | 'height' | 'id' | 'width'>
          & { thumbnail: StorefrontTypes.Image['url'], small: StorefrontTypes.Image['url'], large: StorefrontTypes.Image['url'], original: StorefrontTypes.Image['url'] }
        )> }
      ) }
    ) | (
      Pick<StorefrontTypes.ComponentizableCartLine, 'id' | 'quantity'>
      & { attributes: Array<Pick<StorefrontTypes.Attribute, 'key' | 'value'>>, cost: { amountPerQuantity: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, compareAtAmountPerQuantity?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>>, subtotalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, discountAllocations: Array<{ discountedAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }>, sellingPlanAllocation?: StorefrontTypes.Maybe<{ sellingPlan: Pick<StorefrontTypes.SellingPlan, 'id' | 'name'> }>, variant: (
        { __typename: 'ProductVariant' }
        & Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'quantityAvailable' | 'availableForSale' | 'currentlyNotInStock' | 'requiresShipping' | 'sku'>
        & { selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, 'name' | 'value'>>, product: (
          Pick<StorefrontTypes.Product, 'id' | 'title' | 'handle' | 'onlineStoreUrl'>
          & { featuredImage?: StorefrontTypes.Maybe<(
            Pick<StorefrontTypes.Image, 'altText' | 'height' | 'id' | 'width'>
            & { thumbnail: StorefrontTypes.Image['url'], small: StorefrontTypes.Image['url'], large: StorefrontTypes.Image['url'], original: StorefrontTypes.Image['url'] }
          )>, options: Array<Pick<StorefrontTypes.ProductOption, 'name' | 'values'>>, sellingPlanGroups: { nodes: Array<{ sellingPlans: { nodes: Array<Pick<StorefrontTypes.SellingPlan, 'id' | 'name'>> } }> }, variants: { nodes: Array<Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'availableForSale'>> } }
        ), image?: StorefrontTypes.Maybe<(
          Pick<StorefrontTypes.Image, 'altText' | 'height' | 'id' | 'width'>
          & { thumbnail: StorefrontTypes.Image['url'], small: StorefrontTypes.Image['url'], large: StorefrontTypes.Image['url'], original: StorefrontTypes.Image['url'] }
        )> }
      ) }
    )> } }
);

export type CreateCartMutationVariables = StorefrontTypes.Exact<{
  input?: StorefrontTypes.InputMaybe<StorefrontTypes.CartInput>;
}>;


export type CreateCartMutation = { cartCreate?: StorefrontTypes.Maybe<{ cart?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Cart, 'id'>> }> };

export type GetCartIdQueryVariables = StorefrontTypes.Exact<{
  id: StorefrontTypes.Scalars['ID']['input'];
}>;


export type GetCartIdQuery = { cart?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Cart, 'id'>> };

export type AddItemsToCartMutationVariables = StorefrontTypes.Exact<{
  id: StorefrontTypes.Scalars['ID']['input'];
  lines: Array<StorefrontTypes.CartLineInput> | StorefrontTypes.CartLineInput;
}>;


export type AddItemsToCartMutation = { cartLinesAdd?: StorefrontTypes.Maybe<{ cart?: StorefrontTypes.Maybe<(
      Pick<StorefrontTypes.Cart, 'id' | 'checkoutUrl' | 'note' | 'totalQuantity'>
      & { attributes: Array<Pick<StorefrontTypes.Attribute, 'key' | 'value'>>, cost: { subtotalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, discountAllocations: Array<{ discountedAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }>, discountCodes: Array<Pick<StorefrontTypes.CartDiscountCode, 'applicable' | 'code'>>, lines: { pageInfo: Pick<StorefrontTypes.PageInfo, 'hasNextPage' | 'hasPreviousPage' | 'startCursor' | 'endCursor'>, nodes: Array<(
          Pick<StorefrontTypes.CartLine, 'id' | 'quantity'>
          & { attributes: Array<Pick<StorefrontTypes.Attribute, 'key' | 'value'>>, cost: { amountPerQuantity: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, compareAtAmountPerQuantity?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>>, subtotalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, discountAllocations: Array<{ discountedAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }>, sellingPlanAllocation?: StorefrontTypes.Maybe<{ sellingPlan: Pick<StorefrontTypes.SellingPlan, 'id' | 'name'> }>, variant: (
            { __typename: 'ProductVariant' }
            & Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'quantityAvailable' | 'availableForSale' | 'currentlyNotInStock' | 'requiresShipping' | 'sku'>
            & { selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, 'name' | 'value'>>, product: (
              Pick<StorefrontTypes.Product, 'id' | 'title' | 'handle' | 'onlineStoreUrl'>
              & { featuredImage?: StorefrontTypes.Maybe<(
                Pick<StorefrontTypes.Image, 'altText' | 'height' | 'id' | 'width'>
                & { thumbnail: StorefrontTypes.Image['url'], small: StorefrontTypes.Image['url'], large: StorefrontTypes.Image['url'], original: StorefrontTypes.Image['url'] }
              )>, options: Array<Pick<StorefrontTypes.ProductOption, 'name' | 'values'>>, sellingPlanGroups: { nodes: Array<{ sellingPlans: { nodes: Array<Pick<StorefrontTypes.SellingPlan, 'id' | 'name'>> } }> }, variants: { nodes: Array<Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'availableForSale'>> } }
            ), image?: StorefrontTypes.Maybe<(
              Pick<StorefrontTypes.Image, 'altText' | 'height' | 'id' | 'width'>
              & { thumbnail: StorefrontTypes.Image['url'], small: StorefrontTypes.Image['url'], large: StorefrontTypes.Image['url'], original: StorefrontTypes.Image['url'] }
            )> }
          ) }
        ) | (
          Pick<StorefrontTypes.ComponentizableCartLine, 'id' | 'quantity'>
          & { attributes: Array<Pick<StorefrontTypes.Attribute, 'key' | 'value'>>, cost: { amountPerQuantity: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, compareAtAmountPerQuantity?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>>, subtotalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, discountAllocations: Array<{ discountedAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }>, sellingPlanAllocation?: StorefrontTypes.Maybe<{ sellingPlan: Pick<StorefrontTypes.SellingPlan, 'id' | 'name'> }>, variant: (
            { __typename: 'ProductVariant' }
            & Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'quantityAvailable' | 'availableForSale' | 'currentlyNotInStock' | 'requiresShipping' | 'sku'>
            & { selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, 'name' | 'value'>>, product: (
              Pick<StorefrontTypes.Product, 'id' | 'title' | 'handle' | 'onlineStoreUrl'>
              & { featuredImage?: StorefrontTypes.Maybe<(
                Pick<StorefrontTypes.Image, 'altText' | 'height' | 'id' | 'width'>
                & { thumbnail: StorefrontTypes.Image['url'], small: StorefrontTypes.Image['url'], large: StorefrontTypes.Image['url'], original: StorefrontTypes.Image['url'] }
              )>, options: Array<Pick<StorefrontTypes.ProductOption, 'name' | 'values'>>, sellingPlanGroups: { nodes: Array<{ sellingPlans: { nodes: Array<Pick<StorefrontTypes.SellingPlan, 'id' | 'name'>> } }> }, variants: { nodes: Array<Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'availableForSale'>> } }
            ), image?: StorefrontTypes.Maybe<(
              Pick<StorefrontTypes.Image, 'altText' | 'height' | 'id' | 'width'>
              & { thumbnail: StorefrontTypes.Image['url'], small: StorefrontTypes.Image['url'], large: StorefrontTypes.Image['url'], original: StorefrontTypes.Image['url'] }
            )> }
          ) }
        )> } }
    )>, userErrors: Array<Pick<StorefrontTypes.CartUserError, 'field' | 'message'>> }> };

export type RemoveFromCartMutationVariables = StorefrontTypes.Exact<{
  id: StorefrontTypes.Scalars['ID']['input'];
  lineIds: Array<StorefrontTypes.Scalars['ID']['input']> | StorefrontTypes.Scalars['ID']['input'];
}>;


export type RemoveFromCartMutation = { cartLinesRemove?: StorefrontTypes.Maybe<{ cart?: StorefrontTypes.Maybe<(
      Pick<StorefrontTypes.Cart, 'id' | 'checkoutUrl' | 'note' | 'totalQuantity'>
      & { attributes: Array<Pick<StorefrontTypes.Attribute, 'key' | 'value'>>, cost: { subtotalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, discountAllocations: Array<{ discountedAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }>, discountCodes: Array<Pick<StorefrontTypes.CartDiscountCode, 'applicable' | 'code'>>, lines: { pageInfo: Pick<StorefrontTypes.PageInfo, 'hasNextPage' | 'hasPreviousPage' | 'startCursor' | 'endCursor'>, nodes: Array<(
          Pick<StorefrontTypes.CartLine, 'id' | 'quantity'>
          & { attributes: Array<Pick<StorefrontTypes.Attribute, 'key' | 'value'>>, cost: { amountPerQuantity: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, compareAtAmountPerQuantity?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>>, subtotalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, discountAllocations: Array<{ discountedAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }>, sellingPlanAllocation?: StorefrontTypes.Maybe<{ sellingPlan: Pick<StorefrontTypes.SellingPlan, 'id' | 'name'> }>, variant: (
            { __typename: 'ProductVariant' }
            & Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'quantityAvailable' | 'availableForSale' | 'currentlyNotInStock' | 'requiresShipping' | 'sku'>
            & { selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, 'name' | 'value'>>, product: (
              Pick<StorefrontTypes.Product, 'id' | 'title' | 'handle' | 'onlineStoreUrl'>
              & { featuredImage?: StorefrontTypes.Maybe<(
                Pick<StorefrontTypes.Image, 'altText' | 'height' | 'id' | 'width'>
                & { thumbnail: StorefrontTypes.Image['url'], small: StorefrontTypes.Image['url'], large: StorefrontTypes.Image['url'], original: StorefrontTypes.Image['url'] }
              )>, options: Array<Pick<StorefrontTypes.ProductOption, 'name' | 'values'>>, sellingPlanGroups: { nodes: Array<{ sellingPlans: { nodes: Array<Pick<StorefrontTypes.SellingPlan, 'id' | 'name'>> } }> }, variants: { nodes: Array<Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'availableForSale'>> } }
            ), image?: StorefrontTypes.Maybe<(
              Pick<StorefrontTypes.Image, 'altText' | 'height' | 'id' | 'width'>
              & { thumbnail: StorefrontTypes.Image['url'], small: StorefrontTypes.Image['url'], large: StorefrontTypes.Image['url'], original: StorefrontTypes.Image['url'] }
            )> }
          ) }
        ) | (
          Pick<StorefrontTypes.ComponentizableCartLine, 'id' | 'quantity'>
          & { attributes: Array<Pick<StorefrontTypes.Attribute, 'key' | 'value'>>, cost: { amountPerQuantity: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, compareAtAmountPerQuantity?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>>, subtotalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, discountAllocations: Array<{ discountedAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }>, sellingPlanAllocation?: StorefrontTypes.Maybe<{ sellingPlan: Pick<StorefrontTypes.SellingPlan, 'id' | 'name'> }>, variant: (
            { __typename: 'ProductVariant' }
            & Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'quantityAvailable' | 'availableForSale' | 'currentlyNotInStock' | 'requiresShipping' | 'sku'>
            & { selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, 'name' | 'value'>>, product: (
              Pick<StorefrontTypes.Product, 'id' | 'title' | 'handle' | 'onlineStoreUrl'>
              & { featuredImage?: StorefrontTypes.Maybe<(
                Pick<StorefrontTypes.Image, 'altText' | 'height' | 'id' | 'width'>
                & { thumbnail: StorefrontTypes.Image['url'], small: StorefrontTypes.Image['url'], large: StorefrontTypes.Image['url'], original: StorefrontTypes.Image['url'] }
              )>, options: Array<Pick<StorefrontTypes.ProductOption, 'name' | 'values'>>, sellingPlanGroups: { nodes: Array<{ sellingPlans: { nodes: Array<Pick<StorefrontTypes.SellingPlan, 'id' | 'name'>> } }> }, variants: { nodes: Array<Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'availableForSale'>> } }
            ), image?: StorefrontTypes.Maybe<(
              Pick<StorefrontTypes.Image, 'altText' | 'height' | 'id' | 'width'>
              & { thumbnail: StorefrontTypes.Image['url'], small: StorefrontTypes.Image['url'], large: StorefrontTypes.Image['url'], original: StorefrontTypes.Image['url'] }
            )> }
          ) }
        )> } }
    )>, userErrors: Array<Pick<StorefrontTypes.CartUserError, 'field' | 'message'>> }> };

export type UpdateCartLinesMutationVariables = StorefrontTypes.Exact<{
  id: StorefrontTypes.Scalars['ID']['input'];
  lines: Array<StorefrontTypes.CartLineUpdateInput> | StorefrontTypes.CartLineUpdateInput;
}>;


export type UpdateCartLinesMutation = { cartLinesUpdate?: StorefrontTypes.Maybe<{ cart?: StorefrontTypes.Maybe<(
      Pick<StorefrontTypes.Cart, 'id' | 'checkoutUrl' | 'note' | 'totalQuantity'>
      & { attributes: Array<Pick<StorefrontTypes.Attribute, 'key' | 'value'>>, cost: { subtotalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, discountAllocations: Array<{ discountedAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }>, discountCodes: Array<Pick<StorefrontTypes.CartDiscountCode, 'applicable' | 'code'>>, lines: { pageInfo: Pick<StorefrontTypes.PageInfo, 'hasNextPage' | 'hasPreviousPage' | 'startCursor' | 'endCursor'>, nodes: Array<(
          Pick<StorefrontTypes.CartLine, 'id' | 'quantity'>
          & { attributes: Array<Pick<StorefrontTypes.Attribute, 'key' | 'value'>>, cost: { amountPerQuantity: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, compareAtAmountPerQuantity?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>>, subtotalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, discountAllocations: Array<{ discountedAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }>, sellingPlanAllocation?: StorefrontTypes.Maybe<{ sellingPlan: Pick<StorefrontTypes.SellingPlan, 'id' | 'name'> }>, variant: (
            { __typename: 'ProductVariant' }
            & Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'quantityAvailable' | 'availableForSale' | 'currentlyNotInStock' | 'requiresShipping' | 'sku'>
            & { selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, 'name' | 'value'>>, product: (
              Pick<StorefrontTypes.Product, 'id' | 'title' | 'handle' | 'onlineStoreUrl'>
              & { featuredImage?: StorefrontTypes.Maybe<(
                Pick<StorefrontTypes.Image, 'altText' | 'height' | 'id' | 'width'>
                & { thumbnail: StorefrontTypes.Image['url'], small: StorefrontTypes.Image['url'], large: StorefrontTypes.Image['url'], original: StorefrontTypes.Image['url'] }
              )>, options: Array<Pick<StorefrontTypes.ProductOption, 'name' | 'values'>>, sellingPlanGroups: { nodes: Array<{ sellingPlans: { nodes: Array<Pick<StorefrontTypes.SellingPlan, 'id' | 'name'>> } }> }, variants: { nodes: Array<Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'availableForSale'>> } }
            ), image?: StorefrontTypes.Maybe<(
              Pick<StorefrontTypes.Image, 'altText' | 'height' | 'id' | 'width'>
              & { thumbnail: StorefrontTypes.Image['url'], small: StorefrontTypes.Image['url'], large: StorefrontTypes.Image['url'], original: StorefrontTypes.Image['url'] }
            )> }
          ) }
        ) | (
          Pick<StorefrontTypes.ComponentizableCartLine, 'id' | 'quantity'>
          & { attributes: Array<Pick<StorefrontTypes.Attribute, 'key' | 'value'>>, cost: { amountPerQuantity: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, compareAtAmountPerQuantity?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>>, subtotalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, discountAllocations: Array<{ discountedAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }>, sellingPlanAllocation?: StorefrontTypes.Maybe<{ sellingPlan: Pick<StorefrontTypes.SellingPlan, 'id' | 'name'> }>, variant: (
            { __typename: 'ProductVariant' }
            & Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'quantityAvailable' | 'availableForSale' | 'currentlyNotInStock' | 'requiresShipping' | 'sku'>
            & { selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, 'name' | 'value'>>, product: (
              Pick<StorefrontTypes.Product, 'id' | 'title' | 'handle' | 'onlineStoreUrl'>
              & { featuredImage?: StorefrontTypes.Maybe<(
                Pick<StorefrontTypes.Image, 'altText' | 'height' | 'id' | 'width'>
                & { thumbnail: StorefrontTypes.Image['url'], small: StorefrontTypes.Image['url'], large: StorefrontTypes.Image['url'], original: StorefrontTypes.Image['url'] }
              )>, options: Array<Pick<StorefrontTypes.ProductOption, 'name' | 'values'>>, sellingPlanGroups: { nodes: Array<{ sellingPlans: { nodes: Array<Pick<StorefrontTypes.SellingPlan, 'id' | 'name'>> } }> }, variants: { nodes: Array<Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'availableForSale'>> } }
            ), image?: StorefrontTypes.Maybe<(
              Pick<StorefrontTypes.Image, 'altText' | 'height' | 'id' | 'width'>
              & { thumbnail: StorefrontTypes.Image['url'], small: StorefrontTypes.Image['url'], large: StorefrontTypes.Image['url'], original: StorefrontTypes.Image['url'] }
            )> }
          ) }
        )> } }
    )>, userErrors: Array<Pick<StorefrontTypes.CartUserError, 'field' | 'message'>> }> };

export type UpdateCartNoteMutationVariables = StorefrontTypes.Exact<{
  id: StorefrontTypes.Scalars['ID']['input'];
  note: StorefrontTypes.Scalars['String']['input'];
}>;


export type UpdateCartNoteMutation = { cartNoteUpdate?: StorefrontTypes.Maybe<{ cart?: StorefrontTypes.Maybe<(
      Pick<StorefrontTypes.Cart, 'id' | 'checkoutUrl' | 'note' | 'totalQuantity'>
      & { attributes: Array<Pick<StorefrontTypes.Attribute, 'key' | 'value'>>, cost: { subtotalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, discountAllocations: Array<{ discountedAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }>, discountCodes: Array<Pick<StorefrontTypes.CartDiscountCode, 'applicable' | 'code'>>, lines: { pageInfo: Pick<StorefrontTypes.PageInfo, 'hasNextPage' | 'hasPreviousPage' | 'startCursor' | 'endCursor'>, nodes: Array<(
          Pick<StorefrontTypes.CartLine, 'id' | 'quantity'>
          & { attributes: Array<Pick<StorefrontTypes.Attribute, 'key' | 'value'>>, cost: { amountPerQuantity: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, compareAtAmountPerQuantity?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>>, subtotalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, discountAllocations: Array<{ discountedAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }>, sellingPlanAllocation?: StorefrontTypes.Maybe<{ sellingPlan: Pick<StorefrontTypes.SellingPlan, 'id' | 'name'> }>, variant: (
            { __typename: 'ProductVariant' }
            & Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'quantityAvailable' | 'availableForSale' | 'currentlyNotInStock' | 'requiresShipping' | 'sku'>
            & { selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, 'name' | 'value'>>, product: (
              Pick<StorefrontTypes.Product, 'id' | 'title' | 'handle' | 'onlineStoreUrl'>
              & { featuredImage?: StorefrontTypes.Maybe<(
                Pick<StorefrontTypes.Image, 'altText' | 'height' | 'id' | 'width'>
                & { thumbnail: StorefrontTypes.Image['url'], small: StorefrontTypes.Image['url'], large: StorefrontTypes.Image['url'], original: StorefrontTypes.Image['url'] }
              )>, options: Array<Pick<StorefrontTypes.ProductOption, 'name' | 'values'>>, sellingPlanGroups: { nodes: Array<{ sellingPlans: { nodes: Array<Pick<StorefrontTypes.SellingPlan, 'id' | 'name'>> } }> }, variants: { nodes: Array<Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'availableForSale'>> } }
            ), image?: StorefrontTypes.Maybe<(
              Pick<StorefrontTypes.Image, 'altText' | 'height' | 'id' | 'width'>
              & { thumbnail: StorefrontTypes.Image['url'], small: StorefrontTypes.Image['url'], large: StorefrontTypes.Image['url'], original: StorefrontTypes.Image['url'] }
            )> }
          ) }
        ) | (
          Pick<StorefrontTypes.ComponentizableCartLine, 'id' | 'quantity'>
          & { attributes: Array<Pick<StorefrontTypes.Attribute, 'key' | 'value'>>, cost: { amountPerQuantity: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, compareAtAmountPerQuantity?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>>, subtotalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, discountAllocations: Array<{ discountedAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }>, sellingPlanAllocation?: StorefrontTypes.Maybe<{ sellingPlan: Pick<StorefrontTypes.SellingPlan, 'id' | 'name'> }>, variant: (
            { __typename: 'ProductVariant' }
            & Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'quantityAvailable' | 'availableForSale' | 'currentlyNotInStock' | 'requiresShipping' | 'sku'>
            & { selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, 'name' | 'value'>>, product: (
              Pick<StorefrontTypes.Product, 'id' | 'title' | 'handle' | 'onlineStoreUrl'>
              & { featuredImage?: StorefrontTypes.Maybe<(
                Pick<StorefrontTypes.Image, 'altText' | 'height' | 'id' | 'width'>
                & { thumbnail: StorefrontTypes.Image['url'], small: StorefrontTypes.Image['url'], large: StorefrontTypes.Image['url'], original: StorefrontTypes.Image['url'] }
              )>, options: Array<Pick<StorefrontTypes.ProductOption, 'name' | 'values'>>, sellingPlanGroups: { nodes: Array<{ sellingPlans: { nodes: Array<Pick<StorefrontTypes.SellingPlan, 'id' | 'name'>> } }> }, variants: { nodes: Array<Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'availableForSale'>> } }
            ), image?: StorefrontTypes.Maybe<(
              Pick<StorefrontTypes.Image, 'altText' | 'height' | 'id' | 'width'>
              & { thumbnail: StorefrontTypes.Image['url'], small: StorefrontTypes.Image['url'], large: StorefrontTypes.Image['url'], original: StorefrontTypes.Image['url'] }
            )> }
          ) }
        )> } }
    )>, userErrors: Array<Pick<StorefrontTypes.CartUserError, 'field' | 'message'>> }> };

export type UpdateCartDiscountsMutationVariables = StorefrontTypes.Exact<{
  id: StorefrontTypes.Scalars['ID']['input'];
  discountCodes?: StorefrontTypes.InputMaybe<Array<StorefrontTypes.Scalars['String']['input']> | StorefrontTypes.Scalars['String']['input']>;
}>;


export type UpdateCartDiscountsMutation = { cartDiscountCodesUpdate?: StorefrontTypes.Maybe<{ cart?: StorefrontTypes.Maybe<(
      Pick<StorefrontTypes.Cart, 'id'>
      & { discountCodes: Array<Pick<StorefrontTypes.CartDiscountCode, 'code' | 'applicable'>> }
    )>, userErrors: Array<Pick<StorefrontTypes.CartUserError, 'field' | 'message'>> }> };

export type GetCartQueryVariables = StorefrontTypes.Exact<{
  id: StorefrontTypes.Scalars['ID']['input'];
}>;


export type GetCartQuery = { cart?: StorefrontTypes.Maybe<(
    Pick<StorefrontTypes.Cart, 'id' | 'checkoutUrl' | 'note' | 'totalQuantity'>
    & { attributes: Array<Pick<StorefrontTypes.Attribute, 'key' | 'value'>>, cost: { subtotalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, discountAllocations: Array<{ discountedAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }>, discountCodes: Array<Pick<StorefrontTypes.CartDiscountCode, 'applicable' | 'code'>>, lines: { pageInfo: Pick<StorefrontTypes.PageInfo, 'hasNextPage' | 'hasPreviousPage' | 'startCursor' | 'endCursor'>, nodes: Array<(
        Pick<StorefrontTypes.CartLine, 'id' | 'quantity'>
        & { attributes: Array<Pick<StorefrontTypes.Attribute, 'key' | 'value'>>, cost: { amountPerQuantity: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, compareAtAmountPerQuantity?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>>, subtotalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, discountAllocations: Array<{ discountedAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }>, sellingPlanAllocation?: StorefrontTypes.Maybe<{ sellingPlan: Pick<StorefrontTypes.SellingPlan, 'id' | 'name'> }>, variant: (
          { __typename: 'ProductVariant' }
          & Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'quantityAvailable' | 'availableForSale' | 'currentlyNotInStock' | 'requiresShipping' | 'sku'>
          & { selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, 'name' | 'value'>>, product: (
            Pick<StorefrontTypes.Product, 'id' | 'title' | 'handle' | 'onlineStoreUrl'>
            & { featuredImage?: StorefrontTypes.Maybe<(
              Pick<StorefrontTypes.Image, 'altText' | 'height' | 'id' | 'width'>
              & { thumbnail: StorefrontTypes.Image['url'], small: StorefrontTypes.Image['url'], large: StorefrontTypes.Image['url'], original: StorefrontTypes.Image['url'] }
            )>, options: Array<Pick<StorefrontTypes.ProductOption, 'name' | 'values'>>, sellingPlanGroups: { nodes: Array<{ sellingPlans: { nodes: Array<Pick<StorefrontTypes.SellingPlan, 'id' | 'name'>> } }> }, variants: { nodes: Array<Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'availableForSale'>> } }
          ), image?: StorefrontTypes.Maybe<(
            Pick<StorefrontTypes.Image, 'altText' | 'height' | 'id' | 'width'>
            & { thumbnail: StorefrontTypes.Image['url'], small: StorefrontTypes.Image['url'], large: StorefrontTypes.Image['url'], original: StorefrontTypes.Image['url'] }
          )> }
        ) }
      ) | (
        Pick<StorefrontTypes.ComponentizableCartLine, 'id' | 'quantity'>
        & { attributes: Array<Pick<StorefrontTypes.Attribute, 'key' | 'value'>>, cost: { amountPerQuantity: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, compareAtAmountPerQuantity?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>>, subtotalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, discountAllocations: Array<{ discountedAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }>, sellingPlanAllocation?: StorefrontTypes.Maybe<{ sellingPlan: Pick<StorefrontTypes.SellingPlan, 'id' | 'name'> }>, variant: (
          { __typename: 'ProductVariant' }
          & Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'quantityAvailable' | 'availableForSale' | 'currentlyNotInStock' | 'requiresShipping' | 'sku'>
          & { selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, 'name' | 'value'>>, product: (
            Pick<StorefrontTypes.Product, 'id' | 'title' | 'handle' | 'onlineStoreUrl'>
            & { featuredImage?: StorefrontTypes.Maybe<(
              Pick<StorefrontTypes.Image, 'altText' | 'height' | 'id' | 'width'>
              & { thumbnail: StorefrontTypes.Image['url'], small: StorefrontTypes.Image['url'], large: StorefrontTypes.Image['url'], original: StorefrontTypes.Image['url'] }
            )>, options: Array<Pick<StorefrontTypes.ProductOption, 'name' | 'values'>>, sellingPlanGroups: { nodes: Array<{ sellingPlans: { nodes: Array<Pick<StorefrontTypes.SellingPlan, 'id' | 'name'>> } }> }, variants: { nodes: Array<Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'availableForSale'>> } }
          ), image?: StorefrontTypes.Maybe<(
            Pick<StorefrontTypes.Image, 'altText' | 'height' | 'id' | 'width'>
            & { thumbnail: StorefrontTypes.Image['url'], small: StorefrontTypes.Image['url'], large: StorefrontTypes.Image['url'], original: StorefrontTypes.Image['url'] }
          )> }
        ) }
      )> } }
  )> };

export type CartAttributesUpdateMutationVariables = StorefrontTypes.Exact<{
  id: StorefrontTypes.Scalars['ID']['input'];
  attributes: Array<StorefrontTypes.AttributeInput> | StorefrontTypes.AttributeInput;
}>;


export type CartAttributesUpdateMutation = { cartAttributesUpdate?: StorefrontTypes.Maybe<{ cart?: StorefrontTypes.Maybe<(
      Pick<StorefrontTypes.Cart, 'id' | 'checkoutUrl' | 'note' | 'totalQuantity'>
      & { attributes: Array<Pick<StorefrontTypes.Attribute, 'key' | 'value'>>, cost: { subtotalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, discountAllocations: Array<{ discountedAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }>, discountCodes: Array<Pick<StorefrontTypes.CartDiscountCode, 'applicable' | 'code'>>, lines: { pageInfo: Pick<StorefrontTypes.PageInfo, 'hasNextPage' | 'hasPreviousPage' | 'startCursor' | 'endCursor'>, nodes: Array<(
          Pick<StorefrontTypes.CartLine, 'id' | 'quantity'>
          & { attributes: Array<Pick<StorefrontTypes.Attribute, 'key' | 'value'>>, cost: { amountPerQuantity: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, compareAtAmountPerQuantity?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>>, subtotalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, discountAllocations: Array<{ discountedAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }>, sellingPlanAllocation?: StorefrontTypes.Maybe<{ sellingPlan: Pick<StorefrontTypes.SellingPlan, 'id' | 'name'> }>, variant: (
            { __typename: 'ProductVariant' }
            & Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'quantityAvailable' | 'availableForSale' | 'currentlyNotInStock' | 'requiresShipping' | 'sku'>
            & { selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, 'name' | 'value'>>, product: (
              Pick<StorefrontTypes.Product, 'id' | 'title' | 'handle' | 'onlineStoreUrl'>
              & { featuredImage?: StorefrontTypes.Maybe<(
                Pick<StorefrontTypes.Image, 'altText' | 'height' | 'id' | 'width'>
                & { thumbnail: StorefrontTypes.Image['url'], small: StorefrontTypes.Image['url'], large: StorefrontTypes.Image['url'], original: StorefrontTypes.Image['url'] }
              )>, options: Array<Pick<StorefrontTypes.ProductOption, 'name' | 'values'>>, sellingPlanGroups: { nodes: Array<{ sellingPlans: { nodes: Array<Pick<StorefrontTypes.SellingPlan, 'id' | 'name'>> } }> }, variants: { nodes: Array<Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'availableForSale'>> } }
            ), image?: StorefrontTypes.Maybe<(
              Pick<StorefrontTypes.Image, 'altText' | 'height' | 'id' | 'width'>
              & { thumbnail: StorefrontTypes.Image['url'], small: StorefrontTypes.Image['url'], large: StorefrontTypes.Image['url'], original: StorefrontTypes.Image['url'] }
            )> }
          ) }
        ) | (
          Pick<StorefrontTypes.ComponentizableCartLine, 'id' | 'quantity'>
          & { attributes: Array<Pick<StorefrontTypes.Attribute, 'key' | 'value'>>, cost: { amountPerQuantity: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, compareAtAmountPerQuantity?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>>, subtotalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, discountAllocations: Array<{ discountedAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }>, sellingPlanAllocation?: StorefrontTypes.Maybe<{ sellingPlan: Pick<StorefrontTypes.SellingPlan, 'id' | 'name'> }>, variant: (
            { __typename: 'ProductVariant' }
            & Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'quantityAvailable' | 'availableForSale' | 'currentlyNotInStock' | 'requiresShipping' | 'sku'>
            & { selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, 'name' | 'value'>>, product: (
              Pick<StorefrontTypes.Product, 'id' | 'title' | 'handle' | 'onlineStoreUrl'>
              & { featuredImage?: StorefrontTypes.Maybe<(
                Pick<StorefrontTypes.Image, 'altText' | 'height' | 'id' | 'width'>
                & { thumbnail: StorefrontTypes.Image['url'], small: StorefrontTypes.Image['url'], large: StorefrontTypes.Image['url'], original: StorefrontTypes.Image['url'] }
              )>, options: Array<Pick<StorefrontTypes.ProductOption, 'name' | 'values'>>, sellingPlanGroups: { nodes: Array<{ sellingPlans: { nodes: Array<Pick<StorefrontTypes.SellingPlan, 'id' | 'name'>> } }> }, variants: { nodes: Array<Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'availableForSale'>> } }
            ), image?: StorefrontTypes.Maybe<(
              Pick<StorefrontTypes.Image, 'altText' | 'height' | 'id' | 'width'>
              & { thumbnail: StorefrontTypes.Image['url'], small: StorefrontTypes.Image['url'], large: StorefrontTypes.Image['url'], original: StorefrontTypes.Image['url'] }
            )> }
          ) }
        )> } }
    )>, userErrors: Array<Pick<StorefrontTypes.CartUserError, 'code' | 'field'>> }> };

interface GeneratedQueryTypes {
  "#graphql\n    query getCartId($id: ID!) {\n        cart(id: $id) {\n          id\n        }\n    }\n": {return: GetCartIdQuery, variables: GetCartIdQueryVariables},
  "#graphql\n    query getCart($id: ID!) {\n      cart(id: $id) {\n        ...CartFragment\n      }\n    }\n    #graphql\n    fragment CartFragment on Cart {\n        id\n        attributes {\n          key\n          value\n        }\n        cost {\n          subtotalAmount {\n            amount\n            currencyCode\n          }\n          totalAmount {\n            amount\n            currencyCode\n          }\n        }\n        checkoutUrl\n        discountAllocations {\n          discountedAmount {\n            amount\n            currencyCode\n          }\n        }\n        discountCodes {\n          applicable\n          code\n        }\n        note\n        totalQuantity\n        lines(first: 250) {\n          pageInfo {\n            hasNextPage\n            hasPreviousPage\n            startCursor\n            endCursor\n          }\n          nodes {\n            attributes {\n              key\n              value\n            }\n            cost {\n              amountPerQuantity {\n                amount\n                currencyCode\n              }\n              compareAtAmountPerQuantity {\n                amount\n                currencyCode\n              }\n              subtotalAmount {\n                amount\n                currencyCode\n              }\n              totalAmount {\n                amount\n                currencyCode\n              }\n            }\n            discountAllocations {\n              discountedAmount {\n                amount\n                currencyCode\n              }\n            }\n            id\n            quantity\n            sellingPlanAllocation {\n              sellingPlan {\n                id\n                name\n              }\n            }\n            variant: merchandise {\n               __typename\n              ... on ProductVariant {\n                id\n                title\n                quantityAvailable\n                availableForSale\n                currentlyNotInStock\n                requiresShipping\n                selectedOptions {\n                  name\n                  value\n                }\n                sku\n                product {\n                  id\n                  title\n                  handle\n                  onlineStoreUrl\n                  featuredImage {\n                    altText\n                    height\n                    id\n                    thumbnail: url(transform: { maxWidth: 150, maxHeight: 150 })\n                    small: url(transform: { maxWidth: 250, maxHeight: 250 })\n                    large: url(transform: { maxWidth: 500, maxHeight: 500 })\n                    original: url\n                    width\n                  }\n                  options {\n                    name\n                    values\n                  }\n                  sellingPlanGroups(first: 1) {\n                    nodes {\n                      sellingPlans(first: 12) {\n                        nodes {\n                          id\n                          name\n                        }\n                      }\n                    }\n                  }\n                  variants(first: 50) {\n                    nodes {\n                      id\n                      title\n                      availableForSale\n                    }\n                  }\n                }\n                image {\n                  altText\n                  height\n                  id\n                  thumbnail: url(transform: { maxWidth: 150, maxHeight: 150 })\n                  small: url(transform: { maxWidth: 250, maxHeight: 250 })\n                  large: url(transform: { maxWidth: 500, maxHeight: 500 })\n                  original: url\n                  width\n                }\n              }\n            }\n          }\n        }\n      }\n\n": {return: GetCartQuery, variables: GetCartQueryVariables},
}

interface GeneratedMutationTypes {
  "#graphql\n    mutation createCart($input: CartInput) {\n      cartCreate(input:$input) {\n        cart {\n          id\n        }\n      }\n    }\n": {return: CreateCartMutation, variables: CreateCartMutationVariables},
  "#graphql\n    mutation addItemsToCart($id: ID!, $lines: [CartLineInput!]!) {\n      cartLinesAdd(cartId: $id, lines: $lines) {\n        cart {\n          ...CartFragment\n        }\n        userErrors {\n          field\n          message\n        }\n      }\n    }\n    #graphql\n    fragment CartFragment on Cart {\n        id\n        attributes {\n          key\n          value\n        }\n        cost {\n          subtotalAmount {\n            amount\n            currencyCode\n          }\n          totalAmount {\n            amount\n            currencyCode\n          }\n        }\n        checkoutUrl\n        discountAllocations {\n          discountedAmount {\n            amount\n            currencyCode\n          }\n        }\n        discountCodes {\n          applicable\n          code\n        }\n        note\n        totalQuantity\n        lines(first: 250) {\n          pageInfo {\n            hasNextPage\n            hasPreviousPage\n            startCursor\n            endCursor\n          }\n          nodes {\n            attributes {\n              key\n              value\n            }\n            cost {\n              amountPerQuantity {\n                amount\n                currencyCode\n              }\n              compareAtAmountPerQuantity {\n                amount\n                currencyCode\n              }\n              subtotalAmount {\n                amount\n                currencyCode\n              }\n              totalAmount {\n                amount\n                currencyCode\n              }\n            }\n            discountAllocations {\n              discountedAmount {\n                amount\n                currencyCode\n              }\n            }\n            id\n            quantity\n            sellingPlanAllocation {\n              sellingPlan {\n                id\n                name\n              }\n            }\n            variant: merchandise {\n               __typename\n              ... on ProductVariant {\n                id\n                title\n                quantityAvailable\n                availableForSale\n                currentlyNotInStock\n                requiresShipping\n                selectedOptions {\n                  name\n                  value\n                }\n                sku\n                product {\n                  id\n                  title\n                  handle\n                  onlineStoreUrl\n                  featuredImage {\n                    altText\n                    height\n                    id\n                    thumbnail: url(transform: { maxWidth: 150, maxHeight: 150 })\n                    small: url(transform: { maxWidth: 250, maxHeight: 250 })\n                    large: url(transform: { maxWidth: 500, maxHeight: 500 })\n                    original: url\n                    width\n                  }\n                  options {\n                    name\n                    values\n                  }\n                  sellingPlanGroups(first: 1) {\n                    nodes {\n                      sellingPlans(first: 12) {\n                        nodes {\n                          id\n                          name\n                        }\n                      }\n                    }\n                  }\n                  variants(first: 50) {\n                    nodes {\n                      id\n                      title\n                      availableForSale\n                    }\n                  }\n                }\n                image {\n                  altText\n                  height\n                  id\n                  thumbnail: url(transform: { maxWidth: 150, maxHeight: 150 })\n                  small: url(transform: { maxWidth: 250, maxHeight: 250 })\n                  large: url(transform: { maxWidth: 500, maxHeight: 500 })\n                  original: url\n                  width\n                }\n              }\n            }\n          }\n        }\n      }\n\n": {return: AddItemsToCartMutation, variables: AddItemsToCartMutationVariables},
  "#graphql\n    mutation removeFromCart($id: ID!, $lineIds: [ID!]!) {\n      cartLinesRemove(cartId: $id, lineIds: $lineIds) {\n        cart {\n          ...CartFragment\n        }\n        userErrors {\n          field\n          message\n        }\n      }\n    }\n    #graphql\n    fragment CartFragment on Cart {\n        id\n        attributes {\n          key\n          value\n        }\n        cost {\n          subtotalAmount {\n            amount\n            currencyCode\n          }\n          totalAmount {\n            amount\n            currencyCode\n          }\n        }\n        checkoutUrl\n        discountAllocations {\n          discountedAmount {\n            amount\n            currencyCode\n          }\n        }\n        discountCodes {\n          applicable\n          code\n        }\n        note\n        totalQuantity\n        lines(first: 250) {\n          pageInfo {\n            hasNextPage\n            hasPreviousPage\n            startCursor\n            endCursor\n          }\n          nodes {\n            attributes {\n              key\n              value\n            }\n            cost {\n              amountPerQuantity {\n                amount\n                currencyCode\n              }\n              compareAtAmountPerQuantity {\n                amount\n                currencyCode\n              }\n              subtotalAmount {\n                amount\n                currencyCode\n              }\n              totalAmount {\n                amount\n                currencyCode\n              }\n            }\n            discountAllocations {\n              discountedAmount {\n                amount\n                currencyCode\n              }\n            }\n            id\n            quantity\n            sellingPlanAllocation {\n              sellingPlan {\n                id\n                name\n              }\n            }\n            variant: merchandise {\n               __typename\n              ... on ProductVariant {\n                id\n                title\n                quantityAvailable\n                availableForSale\n                currentlyNotInStock\n                requiresShipping\n                selectedOptions {\n                  name\n                  value\n                }\n                sku\n                product {\n                  id\n                  title\n                  handle\n                  onlineStoreUrl\n                  featuredImage {\n                    altText\n                    height\n                    id\n                    thumbnail: url(transform: { maxWidth: 150, maxHeight: 150 })\n                    small: url(transform: { maxWidth: 250, maxHeight: 250 })\n                    large: url(transform: { maxWidth: 500, maxHeight: 500 })\n                    original: url\n                    width\n                  }\n                  options {\n                    name\n                    values\n                  }\n                  sellingPlanGroups(first: 1) {\n                    nodes {\n                      sellingPlans(first: 12) {\n                        nodes {\n                          id\n                          name\n                        }\n                      }\n                    }\n                  }\n                  variants(first: 50) {\n                    nodes {\n                      id\n                      title\n                      availableForSale\n                    }\n                  }\n                }\n                image {\n                  altText\n                  height\n                  id\n                  thumbnail: url(transform: { maxWidth: 150, maxHeight: 150 })\n                  small: url(transform: { maxWidth: 250, maxHeight: 250 })\n                  large: url(transform: { maxWidth: 500, maxHeight: 500 })\n                  original: url\n                  width\n                }\n              }\n            }\n          }\n        }\n      }\n\n": {return: RemoveFromCartMutation, variables: RemoveFromCartMutationVariables},
  "#graphql\n    mutation updateCartLines($id: ID!, $lines: [CartLineUpdateInput!]!) {\n      cartLinesUpdate(cartId: $id, lines: $lines) {\n        cart {\n          ...CartFragment\n        }\n        userErrors {\n          field\n          message\n        }\n      }\n    }\n    #graphql\n    fragment CartFragment on Cart {\n        id\n        attributes {\n          key\n          value\n        }\n        cost {\n          subtotalAmount {\n            amount\n            currencyCode\n          }\n          totalAmount {\n            amount\n            currencyCode\n          }\n        }\n        checkoutUrl\n        discountAllocations {\n          discountedAmount {\n            amount\n            currencyCode\n          }\n        }\n        discountCodes {\n          applicable\n          code\n        }\n        note\n        totalQuantity\n        lines(first: 250) {\n          pageInfo {\n            hasNextPage\n            hasPreviousPage\n            startCursor\n            endCursor\n          }\n          nodes {\n            attributes {\n              key\n              value\n            }\n            cost {\n              amountPerQuantity {\n                amount\n                currencyCode\n              }\n              compareAtAmountPerQuantity {\n                amount\n                currencyCode\n              }\n              subtotalAmount {\n                amount\n                currencyCode\n              }\n              totalAmount {\n                amount\n                currencyCode\n              }\n            }\n            discountAllocations {\n              discountedAmount {\n                amount\n                currencyCode\n              }\n            }\n            id\n            quantity\n            sellingPlanAllocation {\n              sellingPlan {\n                id\n                name\n              }\n            }\n            variant: merchandise {\n               __typename\n              ... on ProductVariant {\n                id\n                title\n                quantityAvailable\n                availableForSale\n                currentlyNotInStock\n                requiresShipping\n                selectedOptions {\n                  name\n                  value\n                }\n                sku\n                product {\n                  id\n                  title\n                  handle\n                  onlineStoreUrl\n                  featuredImage {\n                    altText\n                    height\n                    id\n                    thumbnail: url(transform: { maxWidth: 150, maxHeight: 150 })\n                    small: url(transform: { maxWidth: 250, maxHeight: 250 })\n                    large: url(transform: { maxWidth: 500, maxHeight: 500 })\n                    original: url\n                    width\n                  }\n                  options {\n                    name\n                    values\n                  }\n                  sellingPlanGroups(first: 1) {\n                    nodes {\n                      sellingPlans(first: 12) {\n                        nodes {\n                          id\n                          name\n                        }\n                      }\n                    }\n                  }\n                  variants(first: 50) {\n                    nodes {\n                      id\n                      title\n                      availableForSale\n                    }\n                  }\n                }\n                image {\n                  altText\n                  height\n                  id\n                  thumbnail: url(transform: { maxWidth: 150, maxHeight: 150 })\n                  small: url(transform: { maxWidth: 250, maxHeight: 250 })\n                  large: url(transform: { maxWidth: 500, maxHeight: 500 })\n                  original: url\n                  width\n                }\n              }\n            }\n          }\n        }\n      }\n\n": {return: UpdateCartLinesMutation, variables: UpdateCartLinesMutationVariables},
  "#graphql\n    mutation updateCartNote($id: ID!, $note: String!) {\n      cartNoteUpdate(cartId: $id, note: $note) {\n        cart {\n          ...CartFragment\n        }\n        userErrors {\n          field\n          message\n        }\n      }\n    }\n    #graphql\n    fragment CartFragment on Cart {\n        id\n        attributes {\n          key\n          value\n        }\n        cost {\n          subtotalAmount {\n            amount\n            currencyCode\n          }\n          totalAmount {\n            amount\n            currencyCode\n          }\n        }\n        checkoutUrl\n        discountAllocations {\n          discountedAmount {\n            amount\n            currencyCode\n          }\n        }\n        discountCodes {\n          applicable\n          code\n        }\n        note\n        totalQuantity\n        lines(first: 250) {\n          pageInfo {\n            hasNextPage\n            hasPreviousPage\n            startCursor\n            endCursor\n          }\n          nodes {\n            attributes {\n              key\n              value\n            }\n            cost {\n              amountPerQuantity {\n                amount\n                currencyCode\n              }\n              compareAtAmountPerQuantity {\n                amount\n                currencyCode\n              }\n              subtotalAmount {\n                amount\n                currencyCode\n              }\n              totalAmount {\n                amount\n                currencyCode\n              }\n            }\n            discountAllocations {\n              discountedAmount {\n                amount\n                currencyCode\n              }\n            }\n            id\n            quantity\n            sellingPlanAllocation {\n              sellingPlan {\n                id\n                name\n              }\n            }\n            variant: merchandise {\n               __typename\n              ... on ProductVariant {\n                id\n                title\n                quantityAvailable\n                availableForSale\n                currentlyNotInStock\n                requiresShipping\n                selectedOptions {\n                  name\n                  value\n                }\n                sku\n                product {\n                  id\n                  title\n                  handle\n                  onlineStoreUrl\n                  featuredImage {\n                    altText\n                    height\n                    id\n                    thumbnail: url(transform: { maxWidth: 150, maxHeight: 150 })\n                    small: url(transform: { maxWidth: 250, maxHeight: 250 })\n                    large: url(transform: { maxWidth: 500, maxHeight: 500 })\n                    original: url\n                    width\n                  }\n                  options {\n                    name\n                    values\n                  }\n                  sellingPlanGroups(first: 1) {\n                    nodes {\n                      sellingPlans(first: 12) {\n                        nodes {\n                          id\n                          name\n                        }\n                      }\n                    }\n                  }\n                  variants(first: 50) {\n                    nodes {\n                      id\n                      title\n                      availableForSale\n                    }\n                  }\n                }\n                image {\n                  altText\n                  height\n                  id\n                  thumbnail: url(transform: { maxWidth: 150, maxHeight: 150 })\n                  small: url(transform: { maxWidth: 250, maxHeight: 250 })\n                  large: url(transform: { maxWidth: 500, maxHeight: 500 })\n                  original: url\n                  width\n                }\n              }\n            }\n          }\n        }\n      }\n\n": {return: UpdateCartNoteMutation, variables: UpdateCartNoteMutationVariables},
  "#graphql\n    mutation updateCartDiscounts($id: ID!, $discountCodes: [String!]) {\n      cartDiscountCodesUpdate(cartId: $id, discountCodes: $discountCodes) {\n        cart {\n          id\n          discountCodes {\n            code\n            applicable\n          }\n        }\n        userErrors {\n          field\n          message\n        }\n      }\n    }\n": {return: UpdateCartDiscountsMutation, variables: UpdateCartDiscountsMutationVariables},
  "#graphql\n  mutation cartAttributesUpdate($id: ID!, $attributes: [AttributeInput!]!) {\n    cartAttributesUpdate(cartId: $id, attributes: $attributes) {\n    cart {\n      ...CartFragment\n    }\n    userErrors {\n      code\n      field\n    }\n  }\n  #graphql\n    fragment CartFragment on Cart {\n        id\n        attributes {\n          key\n          value\n        }\n        cost {\n          subtotalAmount {\n            amount\n            currencyCode\n          }\n          totalAmount {\n            amount\n            currencyCode\n          }\n        }\n        checkoutUrl\n        discountAllocations {\n          discountedAmount {\n            amount\n            currencyCode\n          }\n        }\n        discountCodes {\n          applicable\n          code\n        }\n        note\n        totalQuantity\n        lines(first: 250) {\n          pageInfo {\n            hasNextPage\n            hasPreviousPage\n            startCursor\n            endCursor\n          }\n          nodes {\n            attributes {\n              key\n              value\n            }\n            cost {\n              amountPerQuantity {\n                amount\n                currencyCode\n              }\n              compareAtAmountPerQuantity {\n                amount\n                currencyCode\n              }\n              subtotalAmount {\n                amount\n                currencyCode\n              }\n              totalAmount {\n                amount\n                currencyCode\n              }\n            }\n            discountAllocations {\n              discountedAmount {\n                amount\n                currencyCode\n              }\n            }\n            id\n            quantity\n            sellingPlanAllocation {\n              sellingPlan {\n                id\n                name\n              }\n            }\n            variant: merchandise {\n               __typename\n              ... on ProductVariant {\n                id\n                title\n                quantityAvailable\n                availableForSale\n                currentlyNotInStock\n                requiresShipping\n                selectedOptions {\n                  name\n                  value\n                }\n                sku\n                product {\n                  id\n                  title\n                  handle\n                  onlineStoreUrl\n                  featuredImage {\n                    altText\n                    height\n                    id\n                    thumbnail: url(transform: { maxWidth: 150, maxHeight: 150 })\n                    small: url(transform: { maxWidth: 250, maxHeight: 250 })\n                    large: url(transform: { maxWidth: 500, maxHeight: 500 })\n                    original: url\n                    width\n                  }\n                  options {\n                    name\n                    values\n                  }\n                  sellingPlanGroups(first: 1) {\n                    nodes {\n                      sellingPlans(first: 12) {\n                        nodes {\n                          id\n                          name\n                        }\n                      }\n                    }\n                  }\n                  variants(first: 50) {\n                    nodes {\n                      id\n                      title\n                      availableForSale\n                    }\n                  }\n                }\n                image {\n                  altText\n                  height\n                  id\n                  thumbnail: url(transform: { maxWidth: 150, maxHeight: 150 })\n                  small: url(transform: { maxWidth: 250, maxHeight: 250 })\n                  large: url(transform: { maxWidth: 500, maxHeight: 500 })\n                  original: url\n                  width\n                }\n              }\n            }\n          }\n        }\n      }\n\n}\n": {return: CartAttributesUpdateMutation, variables: CartAttributesUpdateMutationVariables},
}
declare module '@bryt-designs/storefront-client' {
  type InputMaybe<T> = StorefrontTypes.InputMaybe<T>;
  interface StorefrontQueries extends GeneratedQueryTypes {}
  interface StorefrontMutations extends GeneratedMutationTypes {}
}
