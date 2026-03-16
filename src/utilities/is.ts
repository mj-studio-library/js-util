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
  /** Checks whether the candidate is a valid number. */
  number: (candidate: any): candidate is number =>
    typeof candidate === 'number' && !isNaN(candidate),
  /** Checks whether the candidate is a string. */
  string: (candidate: any): candidate is string => typeof candidate === 'string',
  /** Checks whether the candidate is an integer string. */
  integerString: (candidate: any): candidate is string =>
    is.notEmptyString(candidate) && is.number(Number(candidate)) && /^-?\d+$/.test(candidate),
  /** Checks whether the candidate is a numeric string. */
  numberString: (candidate: any): candidate is string =>
    is.notEmptyString(candidate) &&
    is.number(Number(candidate)) &&
    /^-?\d+(\.\d+)?$/.test(candidate),
  /** Checks whether the candidate is null. */
  null: (candidate: any): candidate is null => candidate === null,
  /** Checks whether the candidate is undefined. */
  undefined: (candidate: any): candidate is undefined => candidate === undefined,
  /** Checks whether the candidate is null or undefined. */
  nullOrUndefined: (candidate: any): candidate is undefined | null =>
    candidate === undefined || candidate === null,
  /** Checks whether the candidate is falsy. */
  falsy: <T>(candidate: T | Falsy): candidate is Falsy => !candidate,
  /** Checks whether the candidate is truthy. */
  truthy: <T>(candidate: T | Falsy): candidate is T => !!candidate,
  /** Checks whether the candidate is a function. */
  function: <T extends Func, R extends any>(candidate: T | R): candidate is T =>
    typeof candidate === 'function',
  /** Checks whether the candidate is a non-null object. */
  object: (candidate: any): candidate is Record<string, unknown> =>
    typeof candidate === 'object' && candidate !== null,
  /** Checks whether the candidate is a plain object. */
  plainObject: (candidate: any): candidate is Record<string, unknown> => isPlainObject(candidate),
  /** Checks whether the candidate is an array. */
  array: <T>(candidate: any): candidate is Array<T> => Array.isArray(candidate),
  /** Checks whether the candidate is a boolean. */
  boolean: (candidate: any): candidate is boolean => typeof candidate === 'boolean',
  /** Checks whether the candidate is a promise. */
  promise: <T>(p: Promise<T> | any): p is Promise<T> => isPromise<T>(p),
  /** Checks whether the candidate is a primitive value. */
  primitive: (candidate: unknown): candidate is string | number | boolean | null | undefined =>
    isPrimitive(candidate),
};

const isCheck = {
  /** Checks whether the candidate is a non-empty string. */
  notEmptyString: (candidate: any): candidate is string =>
    isType.string(candidate) && candidate.length > 0,
  /** Checks whether the candidate is an empty string. */
  emptyString: (candidate: any): boolean => isType.string(candidate) && candidate.length === 0,
  /** Checks whether the candidate is an empty array. */
  emptyArray: (candidate: any): boolean => isType.array(candidate) && candidate.length === 0,
  /** Checks whether the candidate is a non-empty array. */
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
