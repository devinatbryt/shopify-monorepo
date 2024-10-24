import type { StorageWithOptions } from "@solid-primitives/storage";
import {
  makePersisted,
  addClearMethod,
  addWithOptionsMethod,
} from "@solid-primitives/storage";

import Cookie from "js-cookie";
import { createSignal, onCleanup } from "solid-js";

import parseId from "./parseId";
import formatId from "./formatId";

function watchCookieChange(
  cookieName: string,
  callback: (newValue: string | undefined) => void,
  interval: number = 1000
): () => void {
  let lastValue = Cookie.get(cookieName);

  // Check for changes immediately
  const checkCookie = () => {
    const newValue = Cookie.get(cookieName);
    if (newValue !== lastValue) {
      lastValue = newValue;
      console.log(`Cart cookie changed: ${newValue}`);
      callback(newValue);
    }
  };

  // Start the polling
  const timer = setInterval(checkCookie, interval);

  // Return the unsubscribe function
  return () => {
    clearInterval(timer);
  };
}

const NAME = "cart";

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
      getItem: (key: string) =>
        Cookie.get(key) ? formatId(Cookie.get(key), "Cart") : undefined,
      setItem: (key: string, value: string, options?: CookieOptions) =>
        Cookie.set(key, parseId(value), {
          ...options,
          expires:
            typeof options?.expires === "function"
              ? options.expires()
              : options?.expires,
        }),
      removeItem: (key: string) => Cookie.remove(key),
    })
  );

  const [cartId, setCartId] = makePersisted(
    createSignal<string | undefined>(),
    {
      name: NAME,
      storage: cookieStorage,
      storageOptions: {
        expires: getExpireTime,
      },
      serialize: (value) => value as any,
      deserialize: (data) => data,
      sync: [
        (subscriber) => {
          const unsub = watchCookieChange(
            NAME,
            (value) => {
              let newValue: string | undefined = value;

              if (value) {
                try {
                  newValue = parseId(value);
                } catch (error) {
                  newValue = value;
                }
              }

              subscriber({
                key: NAME,
                newValue,
                timeStamp: Date.now(),
              });
            },
            100
          );
          onCleanup(() => {
            unsub();
          });
        },
        () => {},
      ],
    }
  );

  return [cartId, setCartId] as const;

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

  // const [id, setId] = createSignal(Cookie.get("cart"));

  // createEffect(
  //   on(id, (id) => {
  //     if (!id) return Cookie.remove("cart");
  //     Cookie.set("cart", id, { expires: 10 });
  //     return onCleanup(() => {
  //       Cookie.remove("cart");
  //     });
  //   })
  // );

  // return {
  //   get token() {
  //     const i = id();
  //     if (i) return formatId(i, "Cart");
  //     return i;
  //   },

  //   set token(id) {
  //     if (!id) return;
  //     const value = parseId(id);
  //     setId(value);
  //   },
  // } as const;
}
