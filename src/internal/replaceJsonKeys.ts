import { JSONCandidate } from './camelCaseObject';
import isPlainObject from './isPlainObject';

function isArray(objOrArray: JSONCandidate): objOrArray is any[] {
  return Array.isArray(objOrArray);
}

export default function replaceJsonKeys(objOrArr: JSONCandidate, replaceMap: Record<string, any>): JSONCandidate {
  if (!objOrArr) return objOrArr;

  if (!isArray(objOrArr) && !isPlainObject(objOrArr)) return objOrArr;

  if (isArray(objOrArr)) {
    return objOrArr.map((v) => replaceJsonKeys(v, replaceMap));
  } else {
    const result: object = {};

    Object.entries(objOrArr).forEach(([key, value]) => {
      if (isPlainObject(value)) {
        value = replaceJsonKeys(value, replaceMap);
      } else if (isArray(value)) {
        value = value.map((v) => replaceJsonKeys(v, replaceMap));
      }

      if (replaceMap[key]) {
        if (typeof replaceMap[key] === 'function') {
          result[key] = replaceMap[key](value);
        } else {
          result[key] = replaceMap[key];
        }
      } else {
        result[key] = value;
      }
    });

    return result;
  }
}
