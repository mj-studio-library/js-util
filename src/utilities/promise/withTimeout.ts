/**
 * Adds a timeout to a Promise, rejecting if the timeout is exceeded
 *
 * @param milli - Timeout duration in milliseconds
 * @param promise - Promise to add timeout to
 * @returns Promise that resolves/rejects with original promise or timeout error
 * @throws Error with message 'Promise timeout in withTimeout<T>' when timeout exceeded
 *
 * @example
 * const result = await withTimeout(5000, fetchUser(userId))
 * // Throws error if fetchUser takes more than 5 seconds
 *
 * @example
 * withTimeout(100, slowPromise())
 * // Throws timeout error after 100ms
 */
export function withTimeout<T>(milli: number, promise: Promise<T>): Promise<T> {
  return Promise.race([
    promise,
    new Promise((resolve, reject) =>
      setTimeout(() => {
        reject(new Error('Promise timeout in withTimeout<T>'));
      }, milli),
    ),
  ]) as Promise<T>;
}
