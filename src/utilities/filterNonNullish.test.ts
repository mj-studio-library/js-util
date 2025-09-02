import { describe, expect, it } from 'vitest';

import { filterNonNullish } from './filterNonNullish';

describe('filterNonNullish', () => {
  it('removes null and undefined values from array', () => {
    expect(filterNonNullish([1, null, 2, undefined, 3])).toEqual([1, 2, 3]);
  });

  it('removes null and undefined from string array', () => {
    expect(filterNonNullish(['a', null, 'b', undefined])).toEqual(['a', 'b']);
  });

  it('keeps falsy values that are not null or undefined', () => {
    expect(filterNonNullish([0, false, '', null, undefined, NaN])).toEqual([0, false, '', NaN]);
  });

  it('returns empty array when all values are null or undefined', () => {
    expect(filterNonNullish([null, undefined, null, undefined])).toEqual([]);
  });

  it('returns same array when no null or undefined values', () => {
    expect(filterNonNullish([1, 2, 3, 4])).toEqual([1, 2, 3, 4]);
    expect(filterNonNullish(['a', 'b', 'c'])).toEqual(['a', 'b', 'c']);
  });

  it('handles empty array', () => {
    expect(filterNonNullish([])).toEqual([]);
  });

  it('works with mixed data types', () => {
    expect(filterNonNullish([1, 'hello', true, null, { a: 1 }, undefined, [1, 2]])).toEqual([
      1,
      'hello',
      true,
      { a: 1 },
      [1, 2],
    ]);
  });

  it('works with objects and arrays', () => {
    const obj = { key: 'value' };
    const arr = [1, 2, 3];
    expect(filterNonNullish([obj, null, arr, undefined])).toEqual([obj, arr]);
  });

  it('preserves array order', () => {
    expect(filterNonNullish([3, null, 1, undefined, 4, null, 1, undefined, 5])).toEqual([
      3, 1, 4, 1, 5,
    ]);
  });

  it('does not mutate original array', () => {
    const original = [1, null, 2, undefined, 3];
    const result = filterNonNullish(original);

    expect(original).toEqual([1, null, 2, undefined, 3]);
    expect(result).toEqual([1, 2, 3]);
    expect(result).not.toBe(original);
  });

  it('handles nested null/undefined values in objects', () => {
    const objWithNull = { a: null };
    const objWithUndefined = { b: undefined };
    const normalObj = { c: 'value' };

    expect(filterNonNullish([objWithNull, null, objWithUndefined, undefined, normalObj])).toEqual([
      objWithNull,
      objWithUndefined,
      normalObj,
    ]);
  });
});
