import { describe, expect, it } from 'vitest';

import { capitalize } from './capitalize';

describe('capitalize', () => {
  it('capitalizes the first character of a lowercase string', () => {
    expect(capitalize('hello')).toBe('Hello');
    expect(capitalize('world')).toBe('World');
  });

  it('capitalizes the first character while keeping the rest unchanged', () => {
    expect(capitalize('hello world')).toBe('Hello world');
    expect(capitalize('javaScript')).toBe('JavaScript');
  });

  it('returns the same string if already capitalized', () => {
    expect(capitalize('Hello')).toBe('Hello');
    expect(capitalize('Hello World')).toBe('Hello World');
  });

  it('handles single character strings', () => {
    expect(capitalize('a')).toBe('A');
    expect(capitalize('Z')).toBe('Z');
  });

  it('returns empty string unchanged', () => {
    expect(capitalize('')).toBe('');
  });

  it('handles strings with numbers and special characters', () => {
    expect(capitalize('123abc')).toBe('123abc');
    expect(capitalize('!hello')).toBe('!hello');
    expect(capitalize('$dollar')).toBe('$dollar');
  });

  it('handles strings starting with whitespace', () => {
    expect(capitalize(' hello')).toBe(' hello');
    expect(capitalize('\thello')).toBe('\thello');
  });
});
