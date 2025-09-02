/**
 * Ensures a Promise takes at least a minimum amount of time to resolve
 *
 * @param minimumMilli - Minimum duration in milliseconds
 * @param promise - Promise to enforce minimum resolve time on
 * @returns Promise that resolves after at least the minimum time
 *
 * @example
 * const result = await withMinimumResolveTime(1000, fetchData())
 * // Guarantees at least 1 second delay for UX (loading spinners)
 *
 * @example
 * withMinimumResolveTime(2000, quickOperation())
 * // Will wait additional time if quickOperation finishes early
 */
export function withMinimumResolveTime<T>(minimumMilli: number, promise: Promise<T>): Promise<T> {
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
