import is from './is';

export function padZero(number: number | undefined, len = 2): string {
  if (!is.number(number)) {
    return '';
  }

  return (number + '').padStart(len, '0');
}
