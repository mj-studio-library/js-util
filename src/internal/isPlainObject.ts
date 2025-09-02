function isObject(any): any is object {
  return typeof any === 'object';
}

/**
 * Checks if a value is a plain object (created by Object literal or Object constructor)
 * Based on Lodash's isPlainObject implementation
 *
 * @param value - Value to check
 * @returns True if the value is a plain object
 *
 * @example
 * isPlainObject({ a: 1 }) // Returns: true
 * isPlainObject(new Date()) // Returns: false
 *
 * @see {@link https://github.com/lodash/lodash/blob/master/isPlainObject.js} Original Lodash implementation
 */
export function isPlainObject(value: any): value is object {
  if (!value || !isObject(value)) {
    return false;
  }

  if (Object.getPrototypeOf(value) === null) {
    return true;
  }

  let proto = value;

  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(value) === proto;
}
