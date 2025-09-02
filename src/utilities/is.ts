import { isPlainObject } from '../internal/isPlainObject';
import isPrimitive from '../internal/isPrimitive';
import { isPromise } from '../internal/isPromise';

type Falsy = undefined | null | 0 | false | '';
type Func = (...args: any[]) => any;

/**
 * Type checking functions collection
 * Provides comprehensive type checking utilities with TypeScript type guards
 */
const isType = {
  number: (candidate: any): candidate is number =>
    typeof candidate === 'number' && !isNaN(candidate),
  string: (candidate: any): candidate is string => typeof candidate === 'string',
  integerString: (candidate: any): candidate is string =>
    is.notEmptyString(candidate) && is.number(Number(candidate)) && /^-?\d+$/.test(candidate),
  numberString: (candidate: any): candidate is string =>
    is.notEmptyString(candidate) &&
    is.number(Number(candidate)) &&
    /^-?\d+(\.\d+)?$/.test(candidate),
  null: (candidate: any): candidate is null => candidate === null,
  undefined: (candidate: any): candidate is undefined => candidate === undefined,
  nullOrUndefined: (candidate: any): candidate is undefined | null =>
    candidate === undefined || candidate === null,
  falsy: <T>(candidate: T | Falsy): candidate is Falsy => !candidate,
  truthy: <T>(candidate: T | Falsy): candidate is T => !!candidate,
  function: <T extends Func, R extends any>(candidate: T | R): candidate is T =>
    typeof candidate === 'function',
  object: (candidate: any): candidate is Record<string, unknown> =>
    typeof candidate === 'object' && candidate !== null,
  plainObject: (candidate: any): candidate is Record<string, unknown> => isPlainObject(candidate),
  array: <T>(candidate: any): candidate is Array<T> => Array.isArray(candidate),
  boolean: (candidate: any): candidate is boolean => typeof candidate === 'boolean',
  promise: <T>(p: Promise<T> | any): p is Promise<T> => isPromise<T>(p),
  primitive: (candidate: unknown): candidate is string | number | boolean | null | undefined =>
    isPrimitive(candidate),
};

const isCheck = {
  notEmptyString: (candidate: any): candidate is string =>
    isType.string(candidate) && candidate.length > 0,
  emptyString: (candidate: any): boolean => isType.string(candidate) && candidate.length === 0,
  emptyArray: (candidate: any): boolean => isType.array(candidate) && candidate.length === 0,
  notEmptyArray: <T>(candidate: any): candidate is Array<T> =>
    isType.array(candidate) && candidate.length > 0,
};

/**
 * Comprehensive collection of type checking utilities
 *
 * @example
 * is.string('hello') // true
 * is.notEmptyString('') // false
 *
 * @example
 * is.plainObject({ a: 1 }) // true
 * is.array([1, 2, 3]) // true
 */
export const is = {
  ...isType,
  ...isCheck,
};
