/**
 * Safely formats a number to a specified number of decimal places
 *
 * @param number - Number to format (optional)
 * @param fractionDigits - Number of decimal places
 * @param defaultString - Default string to return if number is invalid (default: '')
 * @returns Formatted number string or default string
 *
 * @example
 * toFixed(3.14159, 2) // Returns: '3.14'
 * toFixed(5, 0) // Returns: '5'
 *
 * @example
 * toFixed(undefined, 2) // Returns: ''
 * toFixed(null, 2, 'N/A') // Returns: 'N/A'
 */
export function toFixed(
  number: number | undefined,
  fractionDigits: number,
  defaultString = '',
): string {
  return number?.toFixed?.(fractionDigits) ?? defaultString;
}
