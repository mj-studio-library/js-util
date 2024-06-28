import { camelCase } from './camelCase';
import { isPlainObject } from './isPlainObject';

export type JSONCandidate = any[] | object | undefined | null | string | number | boolean;

function isArray(objOrArray: JSONCandidate): objOrArray is any[] {
  return Array.isArray(objOrArray);
}

export function camelCaseObject(objOrArr: JSONCandidate): JSONCandidate {
  if (objOrArr === 0 || objOrArr === null) {
    return objOrArr;
  }

  if (!objOrArr) {
    return objOrArr;
  }

  if (!isArray(objOrArr) && !isPlainObject(objOrArr)) {
    return objOrArr;
  }

  if (isArray(objOrArr)) {
    return objOrArr.map(camelCaseObject);
  } else {
    const result: object = {};

    Object.entries(objOrArr).forEach(([key, value]) => {
      if (isPlainObject(value)) {
        value = camelCaseObject(value);
      } else if (isArray(value)) {
        value = value.map(camelCaseObject);
      }

      result[camelCase(key)] = value;
    });

    return result;
  }
}
