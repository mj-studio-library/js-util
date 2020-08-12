import camelCase from './camelCase';
import isPlainObject from './isPlainObject';

export type JSONCandidate = any[] | object;

function isArray<T>(objOrArray: JSONCandidate): objOrArray is any[] {
  return Array.isArray(objOrArray);
}
function isObject(objOrArray: JSONCandidate): objOrArray is object {
  return typeof objOrArray === 'object' && objOrArray !== null;
}

function camelCaseObject(objOrArr: any): JSONCandidate {
  if (objOrArr === 0 || objOrArr === null) {
    return objOrArr;
  }

  if (!objOrArr) return {};

  if (!isArray(objOrArr) && !isObject(objOrArr)) return objOrArr;

  if (isArray(objOrArr)) {
    return objOrArr.map(camelCaseObject);
  } else {
    const result: object = {};

    Object.entries(objOrArr).forEach(([key, value]) => {
      if (isPlainObject(value)) {
        value = camelCaseObject(value);
      } else if (isArray(value)) {
        value = value.map((v) => (isPlainObject(v) ? camelCaseObject(v) : v));
      }
      result[camelCase(key)] = value;
    });

    return result;
  }
}

export default camelCaseObject;
