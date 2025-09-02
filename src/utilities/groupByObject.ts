type GroupByObject<T, K extends string | number> = { [P in K]: T[] };

/**
 * Groups array elements into an object based on a key
 *
 * @param collection - Array of elements to group
 * @param getKey - Function to extract key from element, or a static key
 * @returns Object with keys mapping to arrays of grouped elements
 *
 * @example
 * groupByObject(users, user => user.age)
 * // Returns: { 25: [users with age 25], 30: [users with age 30] }
 *
 * @example
 * groupByObject(items, item => item.type)
 * // Returns: { fruit: [fruit items], vegetable: [vegetable items] }
 */
export function groupByObject<T, K extends string | number>(
  collection: T[],
  getKey: ((element: T) => K) | K,
): GroupByObject<T, K> {
  return collection.reduce((acc: any, cur) => {
    const key = typeof getKey === 'function' ? getKey(cur) : getKey;

    (acc[key] = acc[key] || []).push(cur);

    return acc;
  }, {}) as GroupByObject<T, K>;
}
