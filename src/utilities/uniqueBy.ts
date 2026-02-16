/**
 * Removes duplicate elements from an array by a selected key.
 *
 * @param arr - Array with potential duplicate elements
 * @param getKey - Function to extract comparison key from each element
 * @returns New array with unique elements by key (keeps first occurrence)
 *
 * @example
 * uniqueBy(
 *   [
 *     { id: 1, name: 'Alice' },
 *     { id: 2, name: 'Bob' },
 *     { id: 1, name: 'Alice v2' },
 *   ],
 *   (item) => item.id,
 * )
 * // Returns: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
 */
export function uniqueBy<T, K>(arr: T[], getKey: (value: T) => K): T[] {
  const seen = new Set<K>();

  return arr.filter((value) => {
    const key = getKey(value);

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);

    return true;
  });
}
