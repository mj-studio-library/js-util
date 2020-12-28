export default function groupByArray<T, K extends string | number>(
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
