import { describe, expect, it } from 'vitest';

import { parseSecond } from './parseSecond';

describe('parseSecond', () => {
  it('parses seconds correctly for basic cases', () => {
    const result = parseSecond(3661); // 1 hour, 1 minute, 1 second
    expect(result).toEqual({
      totalDay: 0,
      totalHour: 1,
      totalMinute: 61,
      onlyHour: 1,
      onlyMinute: 1,
      onlySecond: 1,
    });
  });

  it('parses seconds correctly for large values (multiple days)', () => {
    const result = parseSecond(90000); // 1 day, 1 hour
    expect(result).toEqual({
      totalDay: 1,
      totalHour: 25,
      totalMinute: 1500,
      onlyHour: 1,
      onlyMinute: 0,
      onlySecond: 0,
    });
  });

  it('handles zero seconds', () => {
    const result = parseSecond(0);
    expect(result).toEqual({
      totalDay: 0,
      totalHour: 0,
      totalMinute: 0,
      onlyHour: 0,
      onlyMinute: 0,
      onlySecond: 0,
    });
  });

  it('handles one full day (86400 seconds)', () => {
    const result = parseSecond(86400);
    expect(result).toEqual({
      totalDay: 1,
      totalHour: 24,
      totalMinute: 1440,
      onlyHour: 0,
      onlyMinute: 0,
      onlySecond: 0,
    });
  });

  it('handles one hour (3600 seconds)', () => {
    const result = parseSecond(3600);
    expect(result).toEqual({
      totalDay: 0,
      totalHour: 1,
      totalMinute: 60,
      onlyHour: 1,
      onlyMinute: 0,
      onlySecond: 0,
    });
  });

  it('handles one minute (60 seconds)', () => {
    const result = parseSecond(60);
    expect(result).toEqual({
      totalDay: 0,
      totalHour: 0,
      totalMinute: 1,
      onlyHour: 0,
      onlyMinute: 1,
      onlySecond: 0,
    });
  });

  it('handles 59 seconds', () => {
    const result = parseSecond(59);
    expect(result).toEqual({
      totalDay: 0,
      totalHour: 0,
      totalMinute: 0,
      onlyHour: 0,
      onlyMinute: 0,
      onlySecond: 59,
    });
  });

  it('returns fallback for undefined input', () => {
    const result = parseSecond(undefined);
    expect(result).toEqual({
      totalDay: 0,
      totalHour: 0,
      totalMinute: 0,
      onlyHour: 0,
      onlyMinute: 0,
      onlySecond: 0,
    });
  });

  it('returns fallback for NaN input', () => {
    const result = parseSecond(NaN);
    expect(result).toEqual({
      totalDay: 0,
      totalHour: 0,
      totalMinute: 0,
      onlyHour: 0,
      onlyMinute: 0,
      onlySecond: 0,
    });
  });

  it('handles negative numbers by converting to zero', () => {
    const result = parseSecond(-100);
    expect(result).toEqual({
      totalDay: 0,
      totalHour: 0,
      totalMinute: 0,
      onlyHour: 0,
      onlyMinute: 0,
      onlySecond: 0,
    });
  });

  it('handles fractional seconds by flooring', () => {
    const result = parseSecond(3661.7); // 1 hour, 1 minute, 1.7 seconds
    expect(result).toEqual({
      totalDay: 0,
      totalHour: 1,
      totalMinute: 61,
      onlyHour: 1,

      onlyMinute: 1,
      onlySecond: 1,
    });
  });

  it('handles complex time calculations', () => {
    const result = parseSecond(90061); // 1 day, 1 hour, 1 minute, 1 second
    expect(result).toEqual({
      totalDay: 1,
      totalHour: 25,
      totalMinute: 1501,
      onlyHour: 1,
      onlyMinute: 1,
      onlySecond: 1,
    });
  });
});
