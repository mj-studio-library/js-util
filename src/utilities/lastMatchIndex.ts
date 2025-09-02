/**
 * Finds the last occurrence index of a substring in a string
 *
 * @param str - String to search in
 * @param match - Substring to find
 * @returns Index of last occurrence, -1 if not found
 *
 * @example
 * lastMatchIndex('hello world hello', 'hello') // Returns: 12
 *
 * @example
 * lastMatchIndex('abc def ghi', 'xyz') // Returns: -1
 */
export function lastMatchIndex(str: string, match: string): number {
  for (let i = str.length - match.length; i >= 0; i--) {
    if (str.substring(i, i + match.length) === match) {
      return i;
    }
  }

  return -1;
}
