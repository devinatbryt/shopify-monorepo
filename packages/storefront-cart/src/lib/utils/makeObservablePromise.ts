import { type Accessor, observable } from "solid-js";
export default async function makeObservablePromise<
  Value extends any,
  T extends any,
>(signal: Accessor<Value>, cb: (val: Value) => T) {
  const obs = observable(signal);
  return new Promise<T>(async (resolve, reject) => {
    try {
      const sub = obs.subscribe(async (value) => {
        if (!value) return console.warn("Waiting for value");
        sub.unsubscribe();
        resolve(await cb(value));
      });
    } catch (error) {
      reject(error);
    }
  });
}
