/**
 * Gets the last element of an array
 *
 * @param arr - Array to get last element from
 * @returns Last element of the array
 *
 * @example
 * lastOf([1, 2, 3, 4]) // Returns: 4
 *
 * @example
 * lastOf(['a', 'b', 'c']) // Returns: 'c'
 * lastOf([]) // Returns: undefined
 */
export function lastOf<T>(arr: T[]): T {
  return arr[arr.length - 1];
}
