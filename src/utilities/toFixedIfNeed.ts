import { toFixed } from './toFixed';

/**
 * Formats a number to a fixed decimal places, removing trailing zeros
 *
 * @param number - Number to format (optional)
 * @param fractionDigits - Number of decimal places
 * @param defaultString - Default string to return if number is invalid (default: '')
 * @returns Formatted number string with trailing zeros removed
 *
 * @example
 * toFixedIfNeed(3.1000, 4) // Returns: '3.1'
 * toFixedIfNeed(5.0, 2) // Returns: '5'
 *
 * @example
 * toFixedIfNeed(3.14159, 2) // Returns: '3.14'
 * toFixedIfNeed(undefined, 2, 'N/A') // Returns: 'N/A'
 */
export function toFixedIfNeed(
  number: number | undefined,
  fractionDigits: number,
  defaultString = '',
): string {
  let ret = toFixed(number, fractionDigits, defaultString);
  while (ret.length && ret.charAt(ret.length - 1) === '0') {
    ret = ret.substring(0, ret.length - 1);
  }

  if (ret.length && ret.charAt(ret.length - 1) === '.') {
    ret = ret.substring(0, ret.length - 1);
  }

  return ret;
}
