export default function reverseObjectKeyValues(obj: Record<string, string | number>): Record<string, string> {
  const result: Record<string, string> = {};

  Object.entries(obj).forEach(([k, v]) => {
    if (typeof v !== 'string' && typeof v !== 'number') {
      throw new Error('All values have to be string or number in reverseObjectKeyValues()');
    }

    result[v] = k;
  });

  return result;
}
