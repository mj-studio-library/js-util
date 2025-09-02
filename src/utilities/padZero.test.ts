import { describe, expect, it } from 'vitest';

import { padZero } from './padZero';

describe('padZero', () => {
  it('pads single digit with zero by default (length 2)', () => {
    expect(padZero(5)).toBe('05');
    expect(padZero(0)).toBe('00');
    expect(padZero(9)).toBe('09');
  });

  it('pads number to specified length', () => {
    expect(padZero(5, 3)).toBe('005');
    expect(padZero(1, 4)).toBe('0001');
    expect(padZero(42, 5)).toBe('00042');
  });

  it('returns original number as string if already at target length', () => {
    expect(padZero(12, 2)).toBe('12');
    expect(padZero(100, 3)).toBe('100');
  });

  it('returns original number as string if longer than target length', () => {
    expect(padZero(123, 2)).toBe('123');
    expect(padZero(1000, 3)).toBe('1000');
  });

  it('handles zero correctly', () => {
    expect(padZero(0)).toBe('00');
    expect(padZero(0, 3)).toBe('000');
    expect(padZero(0, 1)).toBe('0');
  });

  it('handles negative numbers', () => {
    expect(padZero(-5)).toBe('-5');
    expect(padZero(-5, 3)).toBe('0-5');
    expect(padZero(-123, 2)).toBe('-123');
  });

  it('returns empty string for undefined input', () => {
    expect(padZero(undefined)).toBe('');
    expect(padZero(undefined, 5)).toBe('');
  });

  it('returns empty string for non-number input', () => {
    expect(padZero(null as any)).toBe('');
    expect(padZero('5' as any)).toBe('');
    expect(padZero(NaN)).toBe('');
  });

  it('handles decimal numbers by converting to string', () => {
    expect(padZero(5.5, 4)).toBe('05.5');
    expect(padZero(1.23, 5)).toBe('01.23');
  });

  it('works with length 1 (no padding)', () => {
    expect(padZero(5, 1)).toBe('5');
    expect(padZero(12, 1)).toBe('12');
  });

  it('works with very large padding lengths', () => {
    expect(padZero(1, 10)).toBe('0000000001');
  });
});
