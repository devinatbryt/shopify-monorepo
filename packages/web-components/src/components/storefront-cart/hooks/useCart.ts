import StorefrontCart from "@bryt-designs/storefront-cart";
import {
  createContext,
  consume,
  provide,
  ICustomElement,
} from "component-register";

type WalkableNode = Parameters<typeof provide>[2];

type CartContextType = (typeof StorefrontCart)["cart"];

const StorefrontCartContext = createContext(() => {
  return StorefrontCart.cart;
});

export const provideCartContext = (element: WalkableNode): CartContextType => {
  return provide(StorefrontCartContext, {}, element);
};

export const useCartContext = (context: CartContextType) => {
  return context;
};

export const useCart = (element: HTMLElement & ICustomElement) => {
  const context = consume(StorefrontCartContext, element);

  if (!context) {
    throw console.error(
      "StorefrontCartContext not found! Please ensure to wrap your custom element with storefront-cart element."
    );
  }

  return useCartContext(context);
};
