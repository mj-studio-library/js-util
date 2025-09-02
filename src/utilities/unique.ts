/**
 * Removes duplicate values from an array
 *
 * @param arr - Array with potential duplicate values
 * @returns New array with unique values
 *
 * @example
 * unique([1, 2, 2, 3, 3, 4])
 * // Returns: [1, 2, 3, 4]
 *
 * @example
 * unique(['apple', 'banana', 'apple'])
 * // Returns: ['apple', 'banana']
 */
export function unique<T>(arr: T[]): T[] {
  return arr.filter((value, index, self) => self.indexOf(value) === index);
}
