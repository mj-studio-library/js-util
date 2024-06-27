import { is } from './is';

export function formatJson(a: any) {
  if (is.number(a) || is.string(a) || !a) {
    return a + '';
  }

  try {
    return JSON.stringify(a, null, 2);
  } catch (e) {
    return 'Error';
  }
}
