import { describe, expect, it } from 'vitest';

import { generateArray } from './generateArray';

describe('generateArray', () => {
  it('generates array of consecutive numbers from 0 to size-1', () => {
    expect(generateArray(5)).toEqual([0, 1, 2, 3, 4]);
  });

  it('returns empty array for size 0', () => {
    expect(generateArray(0)).toEqual([]);
  });

  it('returns empty array for negative sizes', () => {
    expect(generateArray(-1)).toEqual([]);
    expect(generateArray(-10)).toEqual([]);
    expect(generateArray(-100)).toEqual([]);
  });

  it('generates single element array for size 1', () => {
    expect(generateArray(1)).toEqual([0]);
  });

  it('generates array for size 2', () => {
    expect(generateArray(2)).toEqual([0, 1]);
  });

  it('generates array for size 3', () => {
    expect(generateArray(3)).toEqual([0, 1, 2]);
  });

  it('generates larger arrays correctly', () => {
    const result = generateArray(10);
    expect(result).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(result).toHaveLength(10);
  });

  it('generates very large arrays correctly', () => {
    const result = generateArray(100);
    expect(result).toHaveLength(100);
    expect(result[0]).toBe(0);
    expect(result[99]).toBe(99);
    expect(result[50]).toBe(50);
  });

  it('each element equals its index', () => {
    const size = 20;
    const result = generateArray(size);

    result.forEach((value, index) => {
      expect(value).toBe(index);
    });
  });

  it('returns new array instances', () => {
    const result1 = generateArray(5);
    const result2 = generateArray(5);

    expect(result1).not.toBe(result2);
    expect(result1).toEqual(result2);
  });

  it('handles fractional sizes by flooring', () => {
    expect(generateArray(3.7)).toEqual([0, 1, 2, 3]);
    expect(generateArray(3.1)).toEqual([0, 1, 2, 3]);
  });

  it('handles fractional negative sizes', () => {
    expect(generateArray(-1.5)).toEqual([]);
    expect(generateArray(-0.1)).toEqual([]);
  });

  it('returns correct length for generated array', () => {
    expect(generateArray(0)).toHaveLength(0);
    expect(generateArray(1)).toHaveLength(1);
    expect(generateArray(5)).toHaveLength(5);
    expect(generateArray(100)).toHaveLength(100);
  });

  it('all elements are numbers', () => {
    const result = generateArray(10);
    result.forEach((item) => {
      expect(typeof item).toBe('number');
    });
  });

  it('array elements are in ascending order', () => {
    const result = generateArray(20);
    for (let i = 1; i < result.length; i++) {
      expect(result[i]).toBeGreaterThan(result[i - 1]);
      expect(result[i] - result[i - 1]).toBe(1);
    }
  });

  it('performance test for large arrays', () => {
    const size = 10000;
    const start = Date.now();
    const result = generateArray(size);
    const end = Date.now();

    expect(result).toHaveLength(size);
    expect(result[0]).toBe(0);
    expect(result[size - 1]).toBe(size - 1);
    expect(end - start).toBeLessThan(1000); // Should complete within 1 second
  });
});
