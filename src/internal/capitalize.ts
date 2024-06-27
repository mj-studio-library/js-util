import { is } from './is';

export function capitalize(str: string): string {
  if (is.notEmptyString(str)) {
    return `${str[0].toUpperCase()}${str.substring(1)}`;
  }

  return str;
}
