import { is } from './is';

/**
 * Converts a number to a readable string with SI unit suffixes (K, M)
 *
 * @param n - Number to convert to SI unit string
 * @returns String representation with SI unit suffixes, empty string if invalid
 *
 * @example
 * toSiUnitString(1500) // Returns: '1.5K'
 * toSiUnitString(2500000) // Returns: '2.5M'
 *
 * @example
 * toSiUnitString(999) // Returns: '999'
 * toSiUnitString(1000) // Returns: '1K'
 */
export function toSiUnitString(n: number): string {
  if (!is.number(n)) {
    return '';
  }

  if (n < 1000) {
    return n + '';
  }

  if (n < 1000000) {
    const integerPoint = Math.floor(n / 1000);
    const decimalPoint = Math.floor((n % 1000) / 100);
    if (decimalPoint !== 0) {
      return `${integerPoint}.${decimalPoint}K`;
    } else {
      return `${integerPoint}K`;
    }
  }

  const integerPoint = Math.floor(n / 1000000);
  const decimalPoint = Math.floor((n % 1000000) / 100000);
  if (decimalPoint !== 0) {
    return `${integerPoint}.${decimalPoint}M`;
  } else {
    return `${integerPoint}M`;
  }
}
