/**
 * Reverses the keys and values of an object
 *
 * @param obj - Object with string or number values to reverse
 * @returns New object with keys and values swapped
 * @throws Error if any value is not a string or number
 *
 * @example
 * reverseObjectKeyValues({ a: '1', b: '2' })
 * // Returns: { '1': 'a', '2': 'b' }
 *
 * @example
 * reverseObjectKeyValues({ success: 200, error: 500 })
 * // Returns: { '200': 'success', '500': 'error' }
 */
export function reverseObjectKeyValues<T extends Record<string, string | number>>(
  obj: T,
): T | Record<string, string> {
  if (!obj || Array.isArray(obj) || typeof obj !== 'object') {
    return obj;
  }

  const result: Record<string, string> = {};

  Object.entries(obj).forEach(([k, v]) => {
    if (typeof v !== 'string' && typeof v !== 'number') {
      throw new Error('All values have to be string or number in reverseObjectKeyValues()');
    }

    result[v] = k;
  });

  return result;
}
