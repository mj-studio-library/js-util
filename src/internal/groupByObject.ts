type GroupByObject<T, K extends string | number> = { [P in K]: T[] };

export default function groupByObject<T, K extends string | number>(
  collection: T[],
  getKey: ((element: T) => K) | K,
): GroupByObject<T, K> {
  return collection.reduce((acc: any, cur) => {
    const key = typeof getKey === 'function' ? getKey(cur) : getKey;
    (acc[key] = acc[key] || []).push(cur);
    return acc;
  }, {}) as GroupByObject<T, K>;
}
