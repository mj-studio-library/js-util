export default function reverseObjectKeyValues<T extends Record<string, string | number>>(
  obj: T,
): T | Record<string, string> {
  if (!obj || Array.isArray(obj) || typeof obj !== 'object') return obj;

  const result: Record<string, string> = {};

  Object.entries(obj).forEach(([k, v]) => {
    if (typeof v !== 'string' && typeof v !== 'number') {
      throw new Error('All values have to be string or number in reverseObjectKeyValues()');
    }

    result[v] = k;
  });

  return result;
}
