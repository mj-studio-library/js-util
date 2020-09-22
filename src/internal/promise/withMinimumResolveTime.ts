export default function withMinimumResolveTime<T>(milli: number, promise: Promise<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    promise
      .then((result) => {
        const diff = Date.now() - start;

        if (diff > milli) {
          resolve(result);
        } else {
          setTimeout(() => {
            resolve(result);
          }, milli - diff);
        }
      })
      .catch(reject);
  });
}
