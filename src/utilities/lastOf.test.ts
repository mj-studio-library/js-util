import { describe, expect, it } from 'vitest';

import { lastOf } from './lastOf';

describe('lastOf', () => {
  it('returns the last element of a number array', () => {
    expect(lastOf([1, 2, 3, 4])).toBe(4);
  });

  it('returns the last element of a string array', () => {
    expect(lastOf(['a', 'b', 'c'])).toBe('c');
  });

  it('returns undefined for an empty array', () => {
    expect(lastOf([])).toBeUndefined();
  });

  it('returns the only element in a single-element array', () => {
    expect(lastOf([42])).toBe(42);
    expect(lastOf(['single'])).toBe('single');
  });

  it('works with mixed type arrays', () => {
    expect(lastOf([1, 'a', true, null])).toBeNull();
    expect(lastOf([null, undefined, 'last'])).toBe('last');
  });

  it('works with object arrays', () => {
    const obj1 = { a: 1 };
    const obj2 = { b: 2 };
    const obj3 = { c: 3 };
    expect(lastOf([obj1, obj2, obj3])).toBe(obj3);
  });

  it('works with nested arrays', () => {
    const arr1 = [1, 2];
    const arr2 = [3, 4];
    const arr3 = [5, 6];
    expect(lastOf([arr1, arr2, arr3])).toBe(arr3);
  });

  it('works with boolean array', () => {
    expect(lastOf([true, false, true])).toBe(true);
    expect(lastOf([false])).toBe(false);
  });
});
