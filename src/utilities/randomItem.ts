/**
 * Selects a random element from an array
 *
 * @param source - Array to select random element from
 * @returns Random element from the array
 *
 * @example
 * randomItem([1, 2, 3, 4, 5]) // Returns: random number between 1-5
 *
 * @example
 * randomItem(['apple', 'banana', 'orange']) // Returns: random fruit
 */
export function randomItem<T>(source: T[]): T {
  return source[Math.floor(Math.random() * source.length)];
}
