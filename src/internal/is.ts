import { isPlainObject } from '../index';

type Falsy = undefined | null | 0 | false | '';
type Func = (...args: any[]) => any;

const isType = {
  number: (candidate: any): candidate is number => typeof candidate === 'number' && !isNaN(candidate),
  string: (candidate: any): candidate is string => typeof candidate === 'string',
  integerString: (candidate: any): candidate is string =>
    is.notEmptyString(candidate) && is.number(Number(candidate)) && /^-?\d+$/.test(candidate),
  null: (candidate: any): candidate is null => candidate === null,
  undefined: (candidate: any): candidate is undefined => candidate === undefined,
  nullOrUndefined: (candidate: any): candidate is undefined | null => candidate === undefined || candidate === null,
  falsy: <T>(candidate: T | Falsy): candidate is Falsy => !candidate,
  truthy: <T>(candidate: T | Falsy): candidate is T => !!candidate,
  function: <T extends Func, R extends any>(candidate: T | R): candidate is T => typeof candidate === 'function',
  object: (candidate: any): candidate is Record<string, unknown> => typeof candidate === 'object' && candidate !== null,
  plainObject: (candidate: any): candidate is Record<string, unknown> => isPlainObject(candidate),
  array: <T>(candidate: any): candidate is Array<T> => Array.isArray(candidate),
  boolean: (candidate: any): candidate is boolean => typeof candidate === 'boolean',
};

const isCheck = {
  notEmptyString: (candidate: any): candidate is string => isType.string(candidate) && candidate.length > 0,
  emptyString: (candidate: any): candidate is string => isType.string(candidate) && candidate.length === 0,
  emptyArray: (candidate: any): boolean => isType.array(candidate) && candidate.length === 0,
  notEmptyArray: <T>(candidate: any): candidate is Array<T> => isType.array(candidate) && candidate.length > 0,
};

const is = {
  ...isType,
  ...isCheck,
};

export default is;
