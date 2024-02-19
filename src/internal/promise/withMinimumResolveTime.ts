export default function withMinimumResolveTime<T>(
  minimumMilli: number,
  promise: Promise<T>,
): Promise<T> {
  return new Promise((resolve, reject) => {
    const start = Date.now();

    promise
      .then((result) => {
        const diff = Date.now() - start;

        if (diff > minimumMilli) {
          resolve(result);
        } else {
          setTimeout(() => {
            resolve(result);
          }, minimumMilli - diff);
        }
      })
      .catch(reject);
  });
}
