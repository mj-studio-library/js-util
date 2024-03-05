import is from './is';

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
