// import type { StorageWithOptions } from "@solid-primitives/storage";

// import {
//   makePersisted,
//   addClearMethod,
//   addWithOptionsMethod,
// } from "../storage";

import Cookie from "js-cookie";
import { createEffect, createSignal, on, onCleanup } from "solid-js";

import parseId from "./parseId";
import formatId from "./formatId";

export default function createCartCookie() {
  // const getExpireTime = () =>
  //   new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000);

  // type CookieOptions = Omit<typeof Cookie.attributes, "expires"> & {
  //   expires?:
  //     | (() => (typeof Cookie.attributes)["expires"])
  //     | (typeof Cookie.attributes)["expires"];
  // };

  // const cookieStorage: StorageWithOptions<CookieOptions> = addWithOptionsMethod(
  //   addClearMethod({
  //     getItem: (key: string) => Cookie.get(key) || null,
  //     setItem: (key: string, value: string, options?: CookieOptions) =>
  //       Cookie.set(key, value, {
  //         ...options,
  //         expires:
  //           typeof options?.expires === "function"
  //             ? options.expires()
  //             : options?.expires,
  //       }),
  //     removeItem: (key: string) => Cookie.remove(key),
  //   })
  // );
  // const [cartId, setCartId] = makePersisted(createSignal<string>(""), {
  //   name: "cart",
  //   storage: cookieStorage,
  //   storageOptions: {
  //     expires: getExpireTime,
  //   },
  // });
  // const [storefrontCartId, setStorefrontCartId] = makePersisted(
  //   createSignal<string>(""),
  //   {
  //     name: "storefront_cart",
  //     storage: cookieStorage,
  //     storageOptions: {
  //       expires: getExpireTime,
  //     },
  //   }
  // );

  // createEffect(() => {
  //   const id = storefrontCartId();
  //   if (!id) return;
  //   setCartId(parseId(id));
  // });

  const [id, setId] = createSignal(Cookie.get("storefront_cart"));

  createEffect(
    on(id, (id) => {
      if (!id) {
        Cookie.remove("storefront_cart");
        Cookie.remove("cart");
        return;
      }
      Cookie.set("storefront_cart", id, { expires: 10 });
      Cookie.set("cart", id, { expires: 10 });
      return onCleanup(() => {
        Cookie.remove("storefront_cart");
        Cookie.remove("cart");
      });
    })
  );

  return {
    get token() {
      const i = id();
      if (i) return formatId(i, "Cart");
      return i;
    },

    set token(id) {
      if (!id) return;
      const value = parseId(id);
      setId(value);
    },
  } as const;
}
