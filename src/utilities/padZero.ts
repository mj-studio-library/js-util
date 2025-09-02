import { is } from './is';

/**
 * Pads a number with leading zeros to reach the specified length
 *
 * @param number - Number to pad with zeros (optional)
 * @param len - Target length for the padded string (default: 2)
 * @returns Zero-padded string, empty string if number is invalid
 *
 * @example
 * padZero(5) // Returns: '05'
 * padZero(5, 3) // Returns: '005'
 *
 * @example
 * padZero(123, 2) // Returns: '123' (no padding needed)
 * padZero(undefined) // Returns: ''
 */
export function padZero(number: number | undefined, len = 2): string {
  if (!is.number(number)) {
    return '';
  }

  return (number + '').padStart(len, '0');
}
