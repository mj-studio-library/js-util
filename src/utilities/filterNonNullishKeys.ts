type Options = {
  preserveNull?: boolean;
  preserveUndefined?: boolean;
  excludeEmptyString?: boolean;
};

const defaultOptions: Options = {
  preserveNull: false,
  preserveUndefined: false,
  excludeEmptyString: false,
};

/**
 * Filters out object keys with null, undefined, or empty string values
 *
 * @param source - Object to filter keys from
 * @param options - Configuration options for filtering behavior
 * @param options.preserveNull - Whether to keep null values (default: false)
 * @param options.preserveUndefined - Whether to keep undefined values (default: false)
 * @param options.excludeEmptyString - Whether to exclude empty string values (default: false)
 * @returns New object with specified nullish keys removed
 *
 * @example
 * filterNonNullishKeys({ a: 1, b: null, c: undefined, d: 'hello' })
 * // Returns: { a: 1, d: 'hello' }
 *
 * @example
 * filterNonNullishKeys({ a: '', b: null }, { excludeEmptyString: true })
 * // Returns: {}
 */
export function filterNonNullishKeys<T extends object>(
  source: T,
  options: Options = defaultOptions,
): T {
  const mergedOptions: Options = { ...defaultOptions, ...options };
  const ret = {};
  Object.entries(source).forEach(([k, v]) => {
    if (v === null && !mergedOptions.preserveNull) {
      return;
    }

    if (v === undefined && !mergedOptions.preserveUndefined) {
      return;
    }

    if (typeof v === 'string' && !v && mergedOptions.excludeEmptyString) {
      return;
    }

    ret[k] = v;
  });

  return ret as T;
}
