import { describe, expect, it } from 'vitest';

import { unique } from './unique';

describe('unique', () => {
  it('removes duplicate numbers from array', () => {
    expect(unique([1, 2, 2, 3, 3, 4])).toEqual([1, 2, 3, 4]);
  });

  it('removes duplicate strings from array', () => {
    expect(unique(['apple', 'banana', 'apple'])).toEqual(['apple', 'banana']);
  });

  it('handles array with no duplicates', () => {
    expect(unique([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
    expect(unique(['a', 'b', 'c'])).toEqual(['a', 'b', 'c']);
  });

  it('handles empty array', () => {
    expect(unique([])).toEqual([]);
  });

  it('handles array with single element', () => {
    expect(unique([42])).toEqual([42]);
    expect(unique(['single'])).toEqual(['single']);
  });

  it('handles array with all same elements', () => {
    expect(unique([1, 1, 1, 1])).toEqual([1]);
    expect(unique(['same', 'same', 'same'])).toEqual(['same']);
  });

  it('preserves order of first occurrence', () => {
    expect(unique([3, 1, 4, 1, 5, 9, 2, 6, 5])).toEqual([3, 1, 4, 5, 9, 2, 6]);
  });

  it('handles mixed data types', () => {
    expect(unique([1, '1', 2, '2', 1, '1'])).toEqual([1, '1', 2, '2']);
  });

  it('handles boolean values', () => {
    expect(unique([true, false, true, false, true])).toEqual([true, false]);
  });

  it('handles null and undefined values', () => {
    expect(unique([null, undefined, null, undefined, 1])).toEqual([null, undefined, 1]);
  });

  it('handles objects by reference equality', () => {
    const obj1 = { a: 1 };
    const obj2 = { b: 2 };
    const obj3 = { a: 1 }; // Different reference than obj1

    expect(unique([obj1, obj2, obj1, obj3])).toEqual([obj1, obj2, obj3]);
  });

  it('handles arrays by reference equality', () => {
    const arr1 = [1, 2];
    const arr2 = [3, 4];
    const arr3 = [1, 2]; // Different reference than arr1

    expect(unique([arr1, arr2, arr1, arr3])).toEqual([arr1, arr2, arr3]);
  });

  it('handles NaN values correctly', () => {
    // Note: NaN !== NaN, so each NaN is considered unique
    expect(unique([1, NaN, 2, NaN, 3])).toEqual([1, NaN, 2, NaN, 3]);
  });

  it('handles zero values correctly', () => {
    expect(unique([0, -0, 0, -0])).toEqual([0, -0]); // 0 and -0 are considered different by indexOf
  });

  it('does not mutate original array', () => {
    const original = [1, 2, 2, 3, 3, 4];
    const result = unique(original);

    expect(original).toEqual([1, 2, 2, 3, 3, 4]);
    expect(result).toEqual([1, 2, 3, 4]);
    expect(result).not.toBe(original);
  });

  it('handles large arrays efficiently', () => {
    const largeArray = Array(1000)
      .fill(0)
      .map((_, i) => i % 10);
    const result = unique(largeArray);
    expect(result).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('handles nested structures', () => {
    const nested1 = { arr: [1, 2] };
    const nested2 = { arr: [1, 2] };

    expect(unique([nested1, nested2, nested1])).toEqual([nested1, nested2]);
  });

  it('handles function values', () => {
    const fn1 = () => {};
    const fn2 = () => {};

    expect(unique([fn1, fn2, fn1])).toEqual([fn1, fn2]);
  });

  it('handles symbol values', () => {
    const sym1 = Symbol('test');
    const sym2 = Symbol('test');

    expect(unique([sym1, sym2, sym1])).toEqual([sym1, sym2]);
  });
});
