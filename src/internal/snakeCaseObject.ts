import type { JSONCandidate } from './camelCaseObject';
import isPlainObject from './isPlainObject';
import { snakeCase } from './snakeCase';

function isArray(objOrArray: JSONCandidate): objOrArray is any[] {
  return Array.isArray(objOrArray);
}

function snakeCaseObject(objOrArr: JSONCandidate): JSONCandidate {
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
    return objOrArr.map(snakeCaseObject);
  } else {
    const result: object = {};

    Object.entries(objOrArr).forEach(([key, value]) => {
      if (isPlainObject(value)) {
        value = snakeCaseObject(value);
      } else if (isArray(value)) {
        value = value.map(snakeCaseObject);
      }

      result[snakeCase(key)] = value;
    });

    return result;
  }
}

export default snakeCaseObject;
