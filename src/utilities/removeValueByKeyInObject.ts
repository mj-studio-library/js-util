import { is } from './is';

/**
 * Removes specified keys from an object and returns a new object
 *
 * @param v - Object to remove keys from
 * @param key - Key or array of keys to remove
 * @returns New object with specified keys removed
 *
 * @example
 * removeValueByKeyInObject({ a: 1, b: 2, c: 3 }, 'b') // Returns: { a: 1, c: 3 }
 *
 * @example
 * removeValueByKeyInObject({ a: 1, b: 2, c: 3 }, ['a', 'c']) // Returns: { b: 2 }
 */
export function removeValueByKeyInObject<T extends Record<string | number, any>>(
  v: T,
  key: (string | number) | (string | number)[],
): T {
  if (!is.object(v)) {
    return v;
  }

  const ret = {};

  Object.entries(v).forEach(([k, value]) => {
    if (is.array(key)) {
      if (!key.includes(k)) {
        ret[k] = value;
      }
    } else {
      if (k !== key) {
        ret[k] = value;
      }
    }
  });

  return ret as T;
}
