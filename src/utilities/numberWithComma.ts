import { is } from './is';

/**
 * Adds comma separators to a number for better readability
 *
 * @param x - Number to format with commas (optional)
 * @returns Formatted number string with comma separators, empty string if invalid
 *
 * @example
 * numberWithComma(1234567) // Returns: '1,234,567'
 *
 * @example
 * numberWithComma(1234.56) // Returns: '1,234.56'
 * numberWithComma(undefined) // Returns: ''
 */
export function numberWithComma(x?: number): string {
  if (!is.number(x)) {
    return '';
  }

  const parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return parts.join('.');
}
