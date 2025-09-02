import words from '../words';

/**
 * Converts a string to snake_case format
 *
 * @param str - The string to convert to snake_case
 * @returns The converted snake_case string
 *
 * @example
 * snakeCase('userName') // Returns: 'user_name'
 * snakeCase('getUserById') // Returns: 'get_user_by_id'
 */
export function snakeCase(str: string): string {
  return words(str.replace(/['\u2019]/g, '')).reduce(
    (result: string, word: string, index: number) =>
      result + (index ? '_' : '') + word.toLowerCase(),
    '',
  );
}
