import { describe, expect, it } from 'vitest';

import { uniqueBy } from './uniqueBy';

describe('uniqueBy', () => {
  it('removes duplicates by primitive key', () => {
    const items = [
      { id: 1, name: 'a' },
      { id: 2, name: 'b' },
      { id: 1, name: 'c' },
      { id: 3, name: 'd' },
      { id: 2, name: 'e' },
    ];

    expect(uniqueBy(items, (item) => item.id)).toEqual([
      { id: 1, name: 'a' },
      { id: 2, name: 'b' },
      { id: 3, name: 'd' },
    ]);
  });

  it('preserves first occurrence order', () => {
    const items = [
      { key: 'b', value: 1 },
      { key: 'a', value: 2 },
      { key: 'b', value: 3 },
      { key: 'c', value: 4 },
      { key: 'a', value: 5 },
    ];

    expect(uniqueBy(items, (item) => item.key)).toEqual([
      { key: 'b', value: 1 },
      { key: 'a', value: 2 },
      { key: 'c', value: 4 },
    ]);
  });

  it('handles empty arrays', () => {
    expect(uniqueBy([], (value) => value)).toEqual([]);
  });

  it('handles arrays with no duplicates', () => {
    const items = [
      { id: 1, name: 'a' },
      { id: 2, name: 'b' },
      { id: 3, name: 'c' },
    ];

    expect(uniqueBy(items, (item) => item.id)).toEqual(items);
  });

  it('does not mutate the original array', () => {
    const items = [
      { id: 1, name: 'a' },
      { id: 1, name: 'b' },
      { id: 2, name: 'c' },
    ];

    const original = [...items];
    const result = uniqueBy(items, (item) => item.id);

    expect(items).toEqual(original);
    expect(result).toEqual([
      { id: 1, name: 'a' },
      { id: 2, name: 'c' },
    ]);
    expect(result).not.toBe(items);
  });

  it('supports symbol keys', () => {
    const s1 = Symbol('a');
    const s2 = Symbol('b');

    const items = [
      { key: s1, value: 1 },
      { key: s2, value: 2 },
      { key: s1, value: 3 },
    ];

    expect(uniqueBy(items, (item) => item.key)).toEqual([
      { key: s1, value: 1 },
      { key: s2, value: 2 },
    ]);
  });
});
