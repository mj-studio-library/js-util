import { JSONCandidate } from './camelCaseObject';
import isPrimitive from './isPrimitive';

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
  if (isPrimitive(x)) return [false, x];

  if (Array.isArray(x)) {
    let ret = x.map((c) => _filterJsonKeys(c, filter, shouldBeIncluded, false));

    if (shouldBeIncluded) {
      return [true, ret.map((v) => v[1])];
    }

    if (isRoot) {
      return [true, ret.filter((v) => v[0]).map((v) => v[1])];
    }

    ret = ret.filter((v) => v[0]);

    if (ret.length === 0) return [false, undefined];

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

export default function filterJsonKeys(x: JSONCandidate, filter: Filter): JSONCandidate {
  return _filterJsonKeys(x, filter, false, true)[1];
}
