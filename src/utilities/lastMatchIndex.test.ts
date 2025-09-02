import { describe, expect, it } from 'vitest';

import { lastMatchIndex } from './lastMatchIndex';

describe('lastMatchIndex', () => {
  it('finds the last occurrence of a substring', () => {
    expect(lastMatchIndex('hello world hello', 'hello')).toBe(12);
  });

  it('returns -1 when substring is not found', () => {
    expect(lastMatchIndex('abc def ghi', 'xyz')).toBe(-1);
  });

  it('finds single character substring', () => {
    expect(lastMatchIndex('hello world', 'l')).toBe(9);
    expect(lastMatchIndex('abcdef', 'a')).toBe(0);
  });

  it('finds substring at the beginning', () => {
    expect(lastMatchIndex('hello world', 'hello')).toBe(0);
  });

  it('finds substring at the end', () => {
    expect(lastMatchIndex('hello world', 'world')).toBe(6);
  });

  it('handles empty search string', () => {
    expect(lastMatchIndex('hello', '')).toBe(5);
  });

  it('handles empty input string', () => {
    expect(lastMatchIndex('', 'hello')).toBe(-1);
    expect(lastMatchIndex('', '')).toBe(0);
  });

  it('finds overlapping occurrences correctly', () => {
    expect(lastMatchIndex('aaaa', 'aa')).toBe(2);
    expect(lastMatchIndex('abcabc', 'abc')).toBe(3);
  });

  it('handles case sensitive matching', () => {
    expect(lastMatchIndex('Hello HELLO hello', 'hello')).toBe(12);
    expect(lastMatchIndex('Hello HELLO hello', 'HELLO')).toBe(6);
  });

  it('handles special characters', () => {
    expect(lastMatchIndex('test.test.test', '.')).toBe(9);
    expect(lastMatchIndex('a[b]c[d]e', '[')).toBe(5);
    expect(lastMatchIndex('path/to/file/name', '/')).toBe(12);
  });

  it('handles whitespace characters', () => {
    expect(lastMatchIndex('a b c b d', ' b')).toBe(5);
    expect(lastMatchIndex('tab\ttab\ttab', '\t')).toBe(7);
  });

  it('handles unicode characters', () => {
    expect(lastMatchIndex('🚀 test 🚀 end', '🚀')).toBe(8);
    expect(lastMatchIndex('αβγαβγ', 'αβ')).toBe(3);
  });

  it('handles when match is longer than remaining string', () => {
    expect(lastMatchIndex('short', 'verylongstring')).toBe(-1);
  });

  it('handles identical string and match', () => {
    expect(lastMatchIndex('exact', 'exact')).toBe(0);
  });

  it('handles substring that appears only once', () => {
    expect(lastMatchIndex('unique substring test', 'substring')).toBe(7);
  });

  it('handles multiple single character matches', () => {
    expect(lastMatchIndex('banana', 'a')).toBe(5);
    expect(lastMatchIndex('mississippi', 's')).toBe(6);
  });

  it('handles numeric strings', () => {
    expect(lastMatchIndex('123123123', '123')).toBe(6);
    expect(lastMatchIndex('1.2.3.4', '.')).toBe(5);
  });

  it('performance test with long string', () => {
    const longString = 'a'.repeat(1000) + 'target' + 'b'.repeat(1000) + 'target' + 'c'.repeat(100);
    expect(lastMatchIndex(longString, 'target')).toBe(2006);
  });
});
