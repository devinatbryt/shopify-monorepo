import { createSignal, createEffect, on } from "solid-js";

export default function createQueueable() {
  const [queue, setQueue] = createSignal<Function[]>([]);

  createEffect(
    on(queue, (q) => {
      if (!q.length) return;
      if (q.length > 2) return setQueue((queue) => [queue[queue.length - 1]]);
      q[0]();
    })
  );

  function remove() {
    setQueue((q) => {
      return q.slice(1);
    });
  }

  function makeQueueable<Args extends [], R extends any>(
    cb: (...args: Args) => Promise<R>
  ) {
    return async function (...args: Args) {
      return new Promise((resolve, reject) => {
        setQueue((q) => {
          async function handle() {
            return cb(...args)
              .then((res) => {
                remove();
                return resolve(res);
              })
              .catch((err) => {
                remove();
                return reject(err);
              });
          }
          if (q.length >= 1) {
            q.push(handle);
            return q;
          }
          return [handle];
        });
      });
    };
  }

  return [queue, makeQueueable] as const;
}
