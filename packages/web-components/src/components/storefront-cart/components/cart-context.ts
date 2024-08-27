import { createEffect, on } from "solid-js";
import type { CorrectComponentType } from "../../../utils/solid-element";
import { provideCartContext } from "../hooks/useCart";

type CartContextProps = {
  debug?: boolean;
};

const CartContext: CorrectComponentType<CartContextProps> = (
  props,
  { element }
) => {
  const cart = provideCartContext(element);
  createEffect(
    on(
      () => ({
        cart: cart(),
        debug: props.debug,
      }),
      ({ cart, debug }) => {
        if (!debug) return;
        console.log("Cart updated:", cart);
      }
    )
  );
};

export default CartContext;
