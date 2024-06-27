import type { JSONCandidate } from './camelCaseObject';
import { is } from './is';
import { isPlainObject } from './isPlainObject';

function isArray(objOrArray: JSONCandidate): objOrArray is any[] {
  return Array.isArray(objOrArray);
}

export type ReplaceJsonKeyRecursivelyOption = {
  stripUndefined?: boolean;
  replacer?: Record<string, string> | ((key: string) => string | undefined);
};

/**
 * replace all json keys recursively
 */
export function replaceJsonKeysRecursively<T extends JSONCandidate>(
  objOrArr: T,
  options: Partial<Omit<ReplaceJsonKeyRecursivelyOption, 'keyFilter'>>,
): T {
  if (!objOrArr) {
    return objOrArr;
  }

  if (!isArray(objOrArr) && !isPlainObject(objOrArr)) {
    return objOrArr;
  }

  if (isArray(objOrArr)) {
    return objOrArr.map((v) => replaceJsonKeysRecursively(v, options)) as any;
  } else {
    const result: object = {};

    Object.entries(objOrArr).forEach(([key, value]) => {
      let newKey = key;
      if (options.replacer) {
        if (typeof options.replacer === 'function') {
          const fnResult = options.replacer(key);
          if (is.string(fnResult)) {
            newKey = fnResult;
          }
        } else if (key in options.replacer) {
          newKey = options.replacer[key];
        }
      }

      result[newKey] = isPlainObject(value)
        ? replaceJsonKeysRecursively(value, options)
        : isArray(value)
          ? value.map((v) => replaceJsonKeysRecursively(v, options))
          : value;

      if (options.stripUndefined && typeof result[key] === 'undefined') {
        delete result[key];
      }
    });

    return result as T;
  }
}
