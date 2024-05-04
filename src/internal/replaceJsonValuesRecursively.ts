import type { JSONCandidate } from './camelCaseObject';
import isPlainObject from './isPlainObject';

function isArray(objOrArray: JSONCandidate): objOrArray is any[] {
  return Array.isArray(objOrArray);
}

export type ReplaceJsonKeysOptions = {
  stripUndefined?: boolean;
  replacer?: Record<string, Function | any>;
  postLeafTransform?: (value: any) => string;
};

/**
 * replace all json value matches with key selector
 */
export default function replaceJsonValuesRecursively<T extends JSONCandidate>(
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
