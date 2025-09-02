import { isPlainObject } from '../internal/isPlainObject';

import { camelCase } from './camelCase';

export type JSONCandidate = any[] | object | undefined | null | string | number | boolean;

function isArray(objOrArray: JSONCandidate): objOrArray is any[] {
  return Array.isArray(objOrArray);
}

/**
 * Recursively converts all object keys to camelCase
 *
 * @param objOrArr - Object, array, or primitive value to transform
 * @returns The input with all object keys converted to camelCase
 *
 * @example
 * camelCaseObject({ user_name: 'John', user_age: 30 })
 * // Returns: { userName: 'John', userAge: 30 }
 *
 * @example
 * camelCaseObject({ user_info: { first_name: 'John' } })
 * // Returns: { userInfo: { firstName: 'John' } }
 */
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
