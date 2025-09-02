import type { JSONCandidate } from './camelCaseObject';
import { isPlainObject } from './isPlainObject';

function isArray(objOrArray: JSONCandidate): objOrArray is any[] {
  return Array.isArray(objOrArray);
}

export type ReplaceJsonKeysOptions = {
  stripUndefined?: boolean;
  replacer?: Record<string, Function | any>;
  postLeafTransform?: (value: any) => string;
};

/**
 * Recursively replaces values in a JSON structure based on key matching
 *
 * @param objOrArr - Object, array, or primitive value to transform values in
 * @param options - Configuration options for value replacement
 * @param options.stripUndefined - Whether to remove undefined values from result
 * @param options.replacer - Object mapping keys to replacement values or functions
 * @param options.postLeafTransform - Function to transform leaf values after replacement
 * @returns The input structure with values replaced according to the replacer
 *
 * @example
 * replaceJsonValuesRecursively({ name: 'John', age: 30 }, { replacer: { age: 25 } })
 * // Returns: { name: 'John', age: 25 }
 *
 * @example
 * replaceJsonValuesRecursively({ count: 5 }, { replacer: { count: (val) => val * 2 } })
 * // Returns: { count: 10 }
 */
export function replaceJsonValuesRecursively<T extends JSONCandidate>(
  objOrArr: T,
  options: Partial<Omit<ReplaceJsonKeysOptions, 'keyFilter'>>,
): T {
  if (!objOrArr) {
    return objOrArr;
  }

  if (!isArray(objOrArr) && !isPlainObject(objOrArr)) {
    return objOrArr;
  }

  if (isArray(objOrArr)) {
    return objOrArr.map((v) => replaceJsonValuesRecursively(v, options)) as any;
  } else {
    const result: object = {};

    Object.entries(objOrArr).forEach(([key, value]) => {
      if (options.replacer && options.replacer[key]) {
        if (typeof options.replacer[key] === 'function') {
          result[key] = options.replacer[key](value);
        } else {
          result[key] = options.replacer[key];
        }
      } else {
        if (isPlainObject(value)) {
          value = replaceJsonValuesRecursively(value, options);
        } else if (isArray(value)) {
          value = value.map((v) => replaceJsonValuesRecursively(v, options));
        }

        result[key] = value;
      }

      let stripped = false;
      if (options.stripUndefined && typeof result[key] === 'undefined') {
        delete result[key];
        stripped = true;
      }

      if (
        !isArray(result[key]) &&
        !isPlainObject(result[key]) &&
        !stripped &&
        options.postLeafTransform
      ) {
        result[key] = options.postLeafTransform(result[key]);
      }
    });

    return result as T;
  }
}
