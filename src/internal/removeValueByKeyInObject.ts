import is from './is';

export function removeValueByKeyInObject<T extends Record<string | number, any>>(
  v: T,
  key: (string | number) | (string | number)[],
): T {
  if (!is.object(v)) {
    return v;
  }

  const ret = {};

  Object.entries(v).forEach(([k, value]) => {
    if (is.array(key)) {
      if (!key.includes(k)) {
        ret[k] = value;
      }
    } else {
      if (k !== key) {
        ret[k] = value;
      }
    }
  });

  return ret as T;
}
