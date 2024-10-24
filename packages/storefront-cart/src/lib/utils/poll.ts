type PollOptions = {
  interval: number; // time between each poll attempt (in milliseconds)
  timeout?: number; // optional timeout to stop polling (in milliseconds)
  maxRetries?: number; // optional maximum number of retries before giving up
};

export async function poll<T>(
  fn: () => Promise<T>,
  validate: (result: T) => boolean,
  options: PollOptions
): Promise<T> {
  const { interval, timeout = Infinity, maxRetries = Infinity } = options;
  const startTime = Date.now();
  let attempts = 0;

  return new Promise<T>((resolve, reject) => {
    const executePoll = async () => {
      try {
        const result = await fn();
        attempts++;

        if (validate(result)) {
          return resolve(result);
        }

        if (Date.now() - startTime >= timeout) {
          return reject(new Error("Polling timed out"));
        }

        if (attempts >= maxRetries) {
          return reject(new Error("Maximum retries reached"));
        }

        setTimeout(executePoll, interval);
      } catch (error) {
        return reject(error);
      }
    };

    executePoll();
  });
}
