/**
 * Generates an array of consecutive numbers from 0 to size-1
 *
 * @param size - The size of the array to generate
 * @returns Array of numbers from 0 to size-1, empty array if size < 0
 *
 * @example
 * generateArray(5) // Returns: [0, 1, 2, 3, 4]
 *
 * @example
 * generateArray(0) // Returns: []
 * generateArray(-1) // Returns: []
 */
export function generateArray(size: number): number[] {
  if (size < 0) {
    return [];
  }

  const ret = [];
  for (let i = 0; i < size; i++) {
    ret.push(i);
  }

  return ret;
}
