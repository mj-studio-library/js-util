import { is } from './is';

/**
 * Capitalizes the first character of a string
 *
 * @param str - The string to capitalize
 * @returns The string with its first character capitalized
 *
 * @example
 * capitalize('hello') // Returns: 'Hello'
 * capitalize('hello world') // Returns: 'Hello world'
 */
export function capitalize(str: string): string {
  if (is.notEmptyString(str)) {
    return `${str[0].toUpperCase()}${str.substring(1)}`;
  }

  return str;
}
