import { toFixed } from './toFixed';

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
