import client from "./client";
import convertCartToInput from "./utils/convertCartToInput";
import { createCartMutation } from "./queries";

export async function handleNoRESTCart() {
  const res = await client.query(createCartMutation);
  if (!res?.data?.cartCreate?.cart?.id)
    throw new Error("Cart creation failed!");
  return res.data.cartCreate.cart.id;
}

export async function handleHasRESTCart() {
  const cart = await fetch("/cart.js", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((cart) => convertCartToInput(cart));
  const res = await client.query(createCartMutation, {
    variables: {
      input: cart,
    },
  });
  if (!res?.data?.cartCreate?.cart?.id) throw new Error("Cart transfer failed");
  return res.data.cartCreate.cart.id;
}
