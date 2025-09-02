import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { randomItem } from './randomItem';

describe('randomItem', () => {
  let mathRandomSpy: any;

  beforeEach(() => {
    mathRandomSpy = vi.spyOn(Math, 'random');
  });

  afterEach(() => {
    mathRandomSpy.mockRestore();
  });

  it('returns the first element when Math.random returns 0', () => {
    mathRandomSpy.mockReturnValue(0);

    const arr = [1, 2, 3, 4, 5];
    expect(randomItem(arr)).toBe(1);
  });

  it('returns the last element when Math.random returns close to 1', () => {
    mathRandomSpy.mockReturnValue(0.99);

    const arr = [1, 2, 3, 4, 5];
    expect(randomItem(arr)).toBe(5);
  });

  it('returns middle element for appropriate Math.random value', () => {
    mathRandomSpy.mockReturnValue(0.5);

    const arr = [1, 2, 3, 4, 5];
    expect(randomItem(arr)).toBe(3);
  });

  it('works with single element array', () => {
    mathRandomSpy.mockReturnValue(0.5);

    const arr = [42];
    expect(randomItem(arr)).toBe(42);
  });

  it('works with string arrays', () => {
    mathRandomSpy.mockReturnValue(0);

    const arr = ['apple', 'banana', 'orange'];
    expect(randomItem(arr)).toBe('apple');

    mathRandomSpy.mockReturnValue(0.66);
    expect(randomItem(arr)).toBe('banana');
  });

  it('works with mixed type arrays', () => {
    mathRandomSpy.mockReturnValue(0);

    const arr = [1, 'hello', true, null, { a: 1 }];
    expect(randomItem(arr)).toBe(1);

    mathRandomSpy.mockReturnValue(0.8);
    expect(randomItem(arr)).toEqual({ a: 1 });
  });

  it('works with object arrays', () => {
    const obj1 = { id: 1, name: 'first' };
    const obj2 = { id: 2, name: 'second' };
    const obj3 = { id: 3, name: 'third' };
    mathRandomSpy.mockReturnValue(0.33);

    const arr = [obj1, obj2, obj3];
    expect(randomItem(arr)).toBe(obj1);
  });

  it('works with boolean arrays', () => {
    mathRandomSpy.mockReturnValue(0);

    const arr = [true, false];
    expect(randomItem(arr)).toBe(true);

    mathRandomSpy.mockReturnValue(0.6);
    expect(randomItem(arr)).toBe(false);
  });

  it('works with nested arrays', () => {
    const arr1 = [1, 2];
    const arr2 = [3, 4];
    const arr3 = [5, 6];
    mathRandomSpy.mockReturnValue(0.33);

    const arr = [arr1, arr2, arr3];
    expect(randomItem(arr)).toBe(arr1);
  });

  it('handles arrays with undefined and null values', () => {
    mathRandomSpy.mockReturnValue(0);

    const arr = [undefined, null, 'value'];
    expect(randomItem(arr)).toBeUndefined();

    mathRandomSpy.mockReturnValue(0.33);
    expect(randomItem(arr)).toBeNull();

    mathRandomSpy.mockReturnValue(0.67);
    expect(randomItem(arr)).toBe('value');
  });

  it('calls Math.random exactly once', () => {
    mathRandomSpy.mockReturnValue(0.5);

    const arr = [1, 2, 3];
    randomItem(arr);
    expect(mathRandomSpy).toHaveBeenCalledTimes(1);
  });

  // Integration test with real Math.random
  it('returns an element that exists in the array (integration test)', () => {
    mathRandomSpy.mockRestore();

    const arr = [1, 2, 3, 4, 5];
    const result = randomItem(arr);
    expect(arr).toContain(result);
  });

  it('returns different elements over multiple calls (integration test)', () => {
    mathRandomSpy.mockRestore();

    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const results = new Set();

    // Call many times to increase chance of getting different values
    for (let i = 0; i < 100; i++) {
      results.add(randomItem(arr));
    }

    // Should get at least 2 different values in 100 calls
    expect(results.size).toBeGreaterThan(1);
  });
});
