// import type { StorageWithOptions } from "@solid-primitives/storage";
import {
  makePersisted,
  cookieStorage,
  // addClearMethod,
  // addWithOptionsMethod,
} from "@solid-primitives/storage";

import { createSignal, onCleanup } from "solid-js";

import parseId from "./parseId";
import formatId from "./formatId";

function watchCookieChange(
  cookieName: string,
  callback: (newValue: string | undefined) => void,
  interval: number = 1000
): () => void {
  let lastValue = cookieStorage.get(cookieName);

  // Check for changes immediately
  const checkCookie = () => {
    const newValue = cookieStorage.get(cookieName);
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

  // type CookieOptions = Omit<typeof Cookie.attributes, "expires"> & {
  //   expires?:
  //     | (() => (typeof Cookie.attributes)["expires"])
  //     | (typeof Cookie.attributes)["expires"];
  // };

  // const cookieStorage: StorageWithOptions<CookieOptions> = addWithOptionsMethod(
  //   addClearMethod({
  //     getItem: (key: string) => {
  //       console.log(`Cart cookie get: ${key} - ${Cookie.get(key)}`);
  //       return Cookie.get(key) ? formatId(Cookie.get(key), "Cart") : undefined;
  //     },
  //     key() {
  //       return Cookie.get(NAME);
  //     },
  //     setItem: (key: string, value: string, options?: CookieOptions) => {
  //       console.log(`Cart cookie set: ${value}`);
  //       Cookie.set(key, parseId(value), {
  //         ...options,
  //         expires:
  //           typeof options?.expires === "function"
  //             ? options.expires()
  //             : options?.expires,
  //       });
  //     },
  //     removeItem: (key: string) => Cookie.remove(key),
  //   })
  // );

  const [cartId, setCartId] = makePersisted(
    createSignal<string | undefined>(),
    {
      name: NAME,
      storage: {
        ...cookieStorage,
        setItem(key, value) {
          cookieStorage.setItem(key, value, {
            expires: getExpireTime(),
          });
        },
      },
      serialize: (value) => (value ? parseId(value) : (undefined as any)),
      deserialize: (data) => (data ? formatId(data, "Cart") : undefined),
      sync: [
        (subscriber) => {
          const unsub = watchCookieChange(
            NAME,
            (newValue) => {
              subscriber({
                key: NAME,
                newValue,
                timeStamp: Date.now(),
              });
            },
            500
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
}
