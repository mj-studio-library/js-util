/**
 * Groups array elements into subarrays based on a key
 *
 * @param collection - Array of elements to group
 * @param getKey - Function to extract key from element, or a static key
 * @returns Array of arrays, grouped by the key
 *
 * @example
 * groupByArray(users, user => user.age)
 * // Returns: [[users with age 25], [users with age 30]]
 *
 * @example
 * groupByArray([1, 2, 3, 4], n => n % 2)
 * // Returns: [[2, 4], [1, 3]]
 */
export function groupByArray<T, K extends string | number>(
  collection: T[],
  getKey: ((element: T) => K) | K,
): T[][] {
  const keyIndexMap: Map<K, number> = new Map();

  return collection.reduce((acc: any[], cur: T) => {
    const key: K = typeof getKey === 'function' ? getKey(cur) : getKey;

    if (keyIndexMap.has(key)) {
      acc[keyIndexMap.get(key) as number].push(cur);
    } else {
      const nextIndex = acc.length;

      keyIndexMap.set(key, nextIndex);
      acc[nextIndex] = [cur];
    }

    return acc;
  }, []);
}
