import { describe, expect, it } from 'vitest';

import { filterNonNullishKeys } from './filterNonNullishKeys';

describe('filterNonNullishKeys', () => {
  it('removes null and undefined values by default', () => {
    const input = { a: 1, b: null, c: undefined, d: 'hello' };
    const result = filterNonNullishKeys(input);
    expect(result).toEqual({ a: 1, d: 'hello' });
  });

  it('preserves null values when preserveNull option is true', () => {
    const input = { a: 1, b: null, c: undefined, d: 'hello' };
    const result = filterNonNullishKeys(input, { preserveNull: true });
    expect(result).toEqual({ a: 1, b: null, d: 'hello' });
  });

  it('preserves undefined values when preserveUndefined option is true', () => {
    const input = { a: 1, b: null, c: undefined, d: 'hello' };
    const result = filterNonNullishKeys(input, { preserveUndefined: true });
    expect(result).toEqual({ a: 1, c: undefined, d: 'hello' });
  });

  it('preserves both null and undefined when both options are true', () => {
    const input = { a: 1, b: null, c: undefined, d: 'hello' };
    const result = filterNonNullishKeys(input, {
      preserveNull: true,
      preserveUndefined: true,
    });
    expect(result).toEqual(input);
  });

  it('excludes empty strings when excludeEmptyString option is true', () => {
    const input = { a: 1, b: '', c: 'hello', d: null };
    const result = filterNonNullishKeys(input, { excludeEmptyString: true });
    expect(result).toEqual({ a: 1, c: 'hello' });
  });

  it('keeps empty strings by default', () => {
    const input = { a: 1, b: '', c: 'hello' };
    const result = filterNonNullishKeys(input);
    expect(result).toEqual({ a: 1, b: '', c: 'hello' });
  });

  it('handles complex combinations of options', () => {
    const input = {
      a: 1,
      b: null,
      c: undefined,
      d: '',
      e: 'hello',
      f: 0,
      g: false,
    };

    const result = filterNonNullishKeys(input, {
      preserveNull: true,
      excludeEmptyString: true,
    });

    expect(result).toEqual({
      a: 1,
      b: null,
      e: 'hello',
      f: 0,
      g: false,
    });
  });

  it('handles empty object', () => {
    const input = {};
    const result = filterNonNullishKeys(input);
    expect(result).toEqual({});
  });

  it('keeps falsy values that are not null/undefined/empty string', () => {
    const input = { a: 0, b: false, c: NaN, d: null, e: undefined };
    const result = filterNonNullishKeys(input);
    expect(result).toEqual({ a: 0, b: false, c: NaN });
  });

  it('handles nested objects and arrays (keeps them as is)', () => {
    const nestedObj = { x: 1, y: null };
    const nestedArr = [1, null, 3];
    const input = {
      a: nestedObj,
      b: nestedArr,
      c: null,
      d: undefined,
    };
    const result = filterNonNullishKeys(input);
    expect(result).toEqual({ a: nestedObj, b: nestedArr });
  });

  it('does not mutate original object', () => {
    const input = { a: 1, b: null, c: undefined, d: 'hello' };
    const original = { ...input };
    const result = filterNonNullishKeys(input);

    expect(input).toEqual(original);
    expect(result).not.toBe(input);
  });

  it('works with objects containing various data types', () => {
    const date = new Date();
    const regex = /test/;
    const func = () => {};
    const input = {
      str: 'hello',
      num: 42,
      bool: true,
      date: date,
      regex: regex,
      func: func,
      nullVal: null,
      undefinedVal: undefined,
    };
    const result = filterNonNullishKeys(input);
    expect(result).toEqual({
      str: 'hello',
      num: 42,
      bool: true,
      date: date,
      regex: regex,
      func: func,
    });
  });

  it('handles string keys correctly', () => {
    const input = {
      '0': 'zero',
      '1': null,
      'key': 'value',
      'null_key': null,
      'undefined_key': undefined,
    };
    const result = filterNonNullishKeys(input);
    expect(result).toEqual({ '0': 'zero', 'key': 'value' });
  });
});
