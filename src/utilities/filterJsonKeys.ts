import isPrimitive from '../internal/isPrimitive';

import type { JSONCandidate } from './camelCaseObject';

type Filter = ((key: string) => boolean) | string[] | string;

function _isValidKeyForFilter(key: string, filter: Filter) {
  if (typeof filter === 'function') {
    return filter(key);
  } else if (Array.isArray(filter)) {
    return filter.includes(key);
  } else {
    return key === filter;
  }
}

function _filterJsonKeys(
  x: JSONCandidate,
  filter: Filter,
  shouldBeIncluded: boolean,
  isRoot: boolean,
): [boolean, JSONCandidate] {
  if (isPrimitive(x)) {
    return [false, x];
  }

  if (Array.isArray(x)) {
    let ret = x.map((c) => _filterJsonKeys(c, filter, shouldBeIncluded, false));

    if (shouldBeIncluded) {
      return [true, ret.map((v) => v[1])];
    }

    if (isRoot) {
      return [true, ret.filter((v) => v[0]).map((v) => v[1])];
    }

    ret = ret.filter((v) => v[0]);

    if (ret.length === 0) {
      return [false, undefined];
    }

    return [true, ret.map((v) => v[1])];
  } else {
    const result: object = {};

    Object.entries(x).forEach(([key, value]) => {
      const isFilteredKey = _isValidKeyForFilter(key, filter);
      const childRet = _filterJsonKeys(value, filter, shouldBeIncluded || isFilteredKey, false);

      if (!isFilteredKey && !childRet[0] && !shouldBeIncluded) {
        return;
      }

      result[key] = childRet[1];
    });

    if (!isRoot && !shouldBeIncluded && Object.keys(result).length === 0) {
      return [false, undefined];
    }

    return [true, result];
  }
}

/**
 * Filters a JSON structure to include only objects/arrays containing specified keys
 *
 * @param x - JSON structure to filter (object, array, or primitive)
 * @param filter - Key filter - function, array of keys, or single key string
 * @returns Filtered JSON structure containing only elements with matching keys
 *
 * @example
 * filterJsonKeys({ name: 'John', age: 30, city: 'NYC' }, ['name', 'age'])
 * // Returns: { name: 'John', age: 30 }
 *
 * @example
 * filterJsonKeys([{ id: 1, name: 'John' }, { age: 30 }], 'name')
 * // Returns: [{ id: 1, name: 'John' }]
 */
export function filterJsonKeys(x: JSONCandidate, filter: Filter): JSONCandidate {
  return _filterJsonKeys(x, filter, false, true)[1];
}
