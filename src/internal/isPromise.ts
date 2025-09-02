/**
 * Checks if a value is a Promise
 *
 * @param value - Value to check
 * @returns True if the value is a Promise
 *
 * @example
 * isPromise(Promise.resolve('hello')) // Returns: true
 * isPromise({ then: () => {} }) // Returns: false
 */
export function isPromise<T>(value): value is Promise<T> {
  return (
    value !== null &&
    typeof value === 'object' &&
    typeof value.then === 'function' &&
    typeof value.catch === 'function'
  );
}
