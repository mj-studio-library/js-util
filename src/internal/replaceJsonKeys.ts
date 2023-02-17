import { JSONCandidate } from './camelCaseObject';
import isPlainObject from './isPlainObject';

function isArray(objOrArray: JSONCandidate): objOrArray is any[] {
  return Array.isArray(objOrArray);
}

export type ReplaceJsonKeysOptions = {
  stripUndefined?: boolean;
  keyFilter?: ((key: string) => boolean) | string[] | string
  replaceMap?: Record<string, any>
}

// eslint-disable-next-line max-len
export default function replaceJsonKeys(objOrArr: JSONCandidate, options: Partial<Omit<ReplaceJsonKeysOptions, 'keyFilter'>>): JSONCandidate {
  if (!objOrArr) return objOrArr;

  if (!isArray(objOrArr) && !isPlainObject(objOrArr)) return objOrArr;

  if (isArray(objOrArr)) {
    return objOrArr.map((v) => replaceJsonKeys(v, options));
  } else {
    const result: object = {};

    Object.entries(objOrArr).forEach(([key, value]) => {
      if (options.replaceMap && options.replaceMap[key]) {
        if (typeof options.replaceMap[key] === 'function') {
          result[key] = options.replaceMap[key](value);
        } else {
          result[key] = options.replaceMap[key];
        }
      } else {
        if (isPlainObject(value)) {
          value = replaceJsonKeys(value, options);
        } else if (isArray(value)) {
          value = value.map((v) => replaceJsonKeys(v, options));
        }

        result[key] = value;
      }

      if (options.stripUndefined && typeof result[key] === 'undefined') delete result[key];
    });

    return result;
  }
}
