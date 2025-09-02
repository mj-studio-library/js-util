import type { JSONCandidate } from './camelCaseObject';
import { isPlainObject } from './isPlainObject';
import { snakeCase } from './snakeCase';

function isArray(objOrArray: JSONCandidate): objOrArray is any[] {
  return Array.isArray(objOrArray);
}

/**
 * Recursively converts all object keys to snake_case
 *
 * @param objOrArr - Object, array, or primitive value to transform
 * @returns The input with all object keys converted to snake_case
 *
 * @example
 * snakeCaseObject({ userName: 'John', userAge: 30 })
 * // Returns: { user_name: 'John', user_age: 30 }
 *
 * @example
 * snakeCaseObject({ userInfo: { firstName: 'John' } })
 * // Returns: { user_info: { first_name: 'John' } }
 */
export function snakeCaseObject(objOrArr: JSONCandidate): JSONCandidate {
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
