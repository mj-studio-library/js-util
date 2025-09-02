/**
 * Converts a snake_case or kebab-case string to camelCase
 *
 * @param str - The string to convert to camelCase
 * @returns The converted camelCase string
 *
 * @example
 * camelCase('user_name') // Returns: 'userName'
 * camelCase('user-name') // Returns: 'userName'
 */
export function camelCase(str: string): string {
  return str
    .trim() // 1. remove side white spaces
    .replace(/[:-]/g, '_')
    .replace(/(^_+|_+$)/g, '') // 2. remove side underscores
    .replace(/_+[a-z0-9]/g, (word) => {
      // 3. convert snake to camel
      return word.charAt(word.length - 1).toUpperCase();
    });
}
