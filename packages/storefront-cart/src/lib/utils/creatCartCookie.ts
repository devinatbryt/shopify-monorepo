import Cookie from "js-cookie";
import { createEffect, createSignal } from "solid-js";
import {
  makePersisted,
  StorageWithOptions,
  addClearMethod,
  addWithOptionsMethod,
} from "@solid-primitives/storage";

import parseId from "./parseId";

export default function createCartCookie() {
  const getExpireTime = () =>
    new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000);

  type CookieOptions = Omit<typeof Cookie.attributes, "expires"> & {
    expires?:
      | (() => (typeof Cookie.attributes)["expires"])
      | (typeof Cookie.attributes)["expires"];
  };

  const cookieStorage: StorageWithOptions<CookieOptions> = addWithOptionsMethod(
    addClearMethod({
      getItem: (key: string) => Cookie.get(key) || null,
      setItem: (key: string, value: string, options?: CookieOptions) =>
        Cookie.set(key, value, {
          ...options,
          expires:
            typeof options?.expires === "function"
              ? options.expires()
              : options?.expires,
        }),
      removeItem: (key: string) => Cookie.remove(key),
    })
  );
  const [cartId, setCartId] = makePersisted(createSignal<string>(""), {
    name: "cart",
    storage: cookieStorage,
    storageOptions: {
      expires: getExpireTime,
    },
  });
  const [storefrontCartId, setStorefrontCartId] = makePersisted(
    createSignal<string>(""),
    {
      name: "storefront_cart",
      storage: cookieStorage,
      storageOptions: {
        expires: getExpireTime,
      },
    }
  );

  createEffect(() => {
    const id = storefrontCartId();
    if (!id) return;
    setCartId(parseId(id));
  });

  return [
    { restCartId: cartId, cartId: storefrontCartId },
    setStorefrontCartId,
  ] as const;
}
