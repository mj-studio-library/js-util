/**
 * Checks if a value is a primitive type (not function, object, or array)
 *
 * @param x - Value to check
 * @returns True if the value is primitive (string, number, boolean, null, undefined, symbol, bigint)
 *
 * @example
 * isPrimitive('hello') // Returns: true
 * isPrimitive(42) // Returns: true
 *
 * @example
 * isPrimitive({}) // Returns: false
 * isPrimitive([]) // Returns: false
 * isPrimitive(() => {}) // Returns: false
 */
export default function isPrimitive(x: any): boolean {
  return !(typeof x === 'function' || (x !== null && typeof x === 'object') || Array.isArray(x));
}
