import { describe, expect, it } from 'vitest';

import { toggled } from './toggled';

describe('toggled', () => {
  it('adds element if not present in array', () => {
    expect(toggled([1, 2, 3], 4)).toEqual([1, 2, 3, 4]);
    expect(toggled(['a', 'b'], 'c')).toEqual(['a', 'b', 'c']);
  });

  it('removes element if present in array', () => {
    expect(toggled([1, 2, 3], 2)).toEqual([1, 3]);
    expect(toggled(['a', 'b', 'c'], 'b')).toEqual(['a', 'c']);
  });

  it('removes first occurrence only when element appears multiple times', () => {
    expect(toggled([1, 2, 2, 3], 2)).toEqual([1, 3]);
  });

  it('adds element to empty array', () => {
    expect(toggled([], 1)).toEqual([1]);
    expect(toggled([], 'hello')).toEqual(['hello']);
  });

  it('removes the only element from single-element array', () => {
    expect(toggled([42], 42)).toEqual([]);
    expect(toggled(['single'], 'single')).toEqual([]);
  });

  it('works with different data types', () => {
    expect(toggled([true, false], false)).toEqual([true]);
    expect(toggled([true], false)).toEqual([true, false]);
  });

  it('works with objects', () => {
    const obj1 = { id: 1 };
    const obj2 = { id: 2 };
    const obj3 = { id: 3 };

    expect(toggled([obj1, obj2], obj3)).toEqual([obj1, obj2, obj3]);
    expect(toggled([obj1, obj2], obj2)).toEqual([obj1]);
  });

  it('works with null and undefined values', () => {
    expect(toggled([1, null, 3], null)).toEqual([1, 3]);
    expect(toggled([1, 3], null)).toEqual([1, 3, null]);
    expect(toggled([undefined, 1], undefined)).toEqual([1]);
  });

  it('preserves original array order when adding', () => {
    const original = [3, 1, 4, 1, 5];
    expect(toggled(original, 9)).toEqual([3, 1, 4, 1, 5, 9]);
  });

  it('preserves original array order when removing', () => {
    const original = [3, 1, 4, 1, 5];
    expect(toggled(original, 4)).toEqual([3, 1, 1, 5]);
  });

  it('does not mutate original array', () => {
    const original = [1, 2, 3];
    const result = toggled(original, 4);

    expect(original).toEqual([1, 2, 3]);
    expect(result).toEqual([1, 2, 3, 4]);
    expect(result).not.toBe(original);
  });
});
