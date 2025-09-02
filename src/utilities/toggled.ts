/**
 * Toggles an element in an array - adds if not present, removes if present
 *
 * @param arr - Array to toggle element in
 * @param element - Element to toggle
 * @returns New array with element toggled
 *
 * @example
 * toggled([1, 2, 3], 4) // Returns: [1, 2, 3, 4]
 *
 * @example
 * toggled([1, 2, 3], 2) // Returns: [1, 3]
 */
export function toggled<T>(arr: T[], element: T): T[] {
  return arr.includes(element) ? arr.filter((e) => e !== element) : [...arr, element];
}
