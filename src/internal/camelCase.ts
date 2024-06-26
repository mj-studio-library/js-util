/**
 * convert snake_case to camelCase
 *
 * @param str snake_case string to convert camelCase
 * @todo I am regex newbie, any man fix this with more fancy way?
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
