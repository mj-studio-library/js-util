import { describe, expect, it } from 'vitest';

import { formatJson } from './formatJson';

describe('formatJson', () => {
  it('returns string representation for numbers', () => {
    expect(formatJson(123)).toBe('123');
    expect(formatJson(0)).toBe('0');
    expect(formatJson(-456)).toBe('-456');
    expect(formatJson(3.14)).toBe('3.14');
  });

  it('returns string representation for strings', () => {
    expect(formatJson('hello')).toBe('hello');
    expect(formatJson('')).toBe('');
    expect(formatJson('with spaces')).toBe('with spaces');
  });

  it('returns string representation for falsy values', () => {
    expect(formatJson(null)).toBe('null');
    expect(formatJson(undefined)).toBe('undefined');
    expect(formatJson(false)).toBe('false');
    expect(formatJson(0)).toBe('0');
    expect(formatJson('')).toBe('');
  });

  it('returns formatted JSON for objects', () => {
    const obj = { name: 'John', age: 30 };
    const expected = '{\n  "name": "John",\n  "age": 30\n}';
    expect(formatJson(obj)).toBe(expected);
  });

  it('returns formatted JSON for arrays', () => {
    const arr = [1, 2, 3];
    const expected = '[\n  1,\n  2,\n  3\n]';
    expect(formatJson(arr)).toBe(expected);
  });

  it('returns formatted JSON for nested objects', () => {
    const obj = {
      user: {
        name: 'Alice',
        details: {
          age: 25,
          city: 'NY',
        },
      },
    };

    const expected =
      '{\n  "user": {\n    "name": "Alice",\n    "details": {\n      "age": 25,\n      "city": "NY"\n    }\n  }\n}';
    expect(formatJson(obj)).toBe(expected);
  });

  it('returns formatted JSON for mixed arrays and objects', () => {
    const data = [
      { id: 1, name: 'First' },
      { id: 2, name: 'Second' },
    ];

    const expected =
      '[\n  {\n    "id": 1,\n    "name": "First"\n  },\n  {\n    "id": 2,\n    "name": "Second"\n  }\n]';
    expect(formatJson(data)).toBe(expected);
  });

  it('handles boolean true as object', () => {
    expect(formatJson(true)).toBe('true');
  });

  it('handles NaN', () => {
    expect(formatJson(NaN)).toBe('NaN');
  });

  it('handles Infinity', () => {
    expect(formatJson(Infinity)).toBe('Infinity');
    expect(formatJson(-Infinity)).toBe('-Infinity');
  });

  it('returns "Error" for circular references', () => {
    const obj: any = { name: 'test' };
    obj.circular = obj; // Create circular reference

    expect(formatJson(obj)).toBe('Error');
  });

  it('returns "Error" for functions', () => {
    const func = function test() {
      return 'hello';
    };
    expect(formatJson(func)).toBe(undefined);
  });

  it('returns "Error" for symbols', () => {
    const sym = Symbol('test');
    expect(formatJson(sym)).toBe(undefined);
  });

  it('handles Date objects', () => {
    const date = new Date('2023-01-01T00:00:00.000Z');
    const result = formatJson(date);
    expect(result).toBe('"2023-01-01T00:00:00.000Z"');
  });

  it('handles RegExp objects', () => {
    const regex = /test/gi;
    const result = formatJson(regex);
    expect(result).toBe('{}');
  });

  it('handles empty objects and arrays', () => {
    expect(formatJson({})).toBe('{}');
    expect(formatJson([])).toBe('[]');
  });

  it('handles objects with null and undefined values', () => {
    const obj = {
      a: null,
      b: undefined,
      c: 'value',
    };
    const expected = '{\n  "a": null,\n  "c": "value"\n}';
    expect(formatJson(obj)).toBe(expected);
  });

  it('handles large numbers', () => {
    expect(formatJson(Number.MAX_SAFE_INTEGER)).toBe('9007199254740991');
    expect(formatJson(Number.MIN_SAFE_INTEGER)).toBe('-9007199254740991');
  });

  it('handles special string characters', () => {
    const obj = {
      quote: '"Hello"',
      newline: 'Line1\nLine2',
      tab: 'Before\tAfter',
    };
    const result = formatJson(obj);
    expect(result).toContain('\\"Hello\\"');
    expect(result).toContain('\\n');
    expect(result).toContain('\\t');
  });
});
