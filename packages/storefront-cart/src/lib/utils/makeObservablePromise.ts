import { type Accessor, observable } from "solid-js";
export default async function makeObservablePromise<
  Value extends any,
  T extends any,
>(signal: Accessor<Value>, cb: (val: Value) => T) {
  const obs = observable(signal);

  let sub: ReturnType<typeof obs.subscribe>;

  const req = await new Promise<T>(async (resolve, reject) => {
    try {
      sub = obs.subscribe(async (value) => {
        if (!value) return console.warn("Waiting for value");
        resolve(cb(value));
      });
    } catch (error) {
      reject(error);
    }
  });

  // @ts-ignore
  sub.unsubscribe();

  return req;
}
