import { clamp } from './clamp';

describe('clamp', () => {
  it('should clamp value between min and max', () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  it('should return min when value is below min', () => {
    expect(clamp(-5, 0, 10)).toBe(0);
  });

  it('should return max when value is above max', () => {
    expect(clamp(15, 0, 10)).toBe(10);
  });

  it('should handle negative ranges', () => {
    expect(clamp(-15, -10, -5)).toBe(-10);
    expect(clamp(-3, -10, -5)).toBe(-5);
    expect(clamp(-7, -10, -5)).toBe(-7);
  });

  it('should handle decimal values', () => {
    expect(clamp(2.5, 1.0, 3.0)).toBe(2.5);
    expect(clamp(0.5, 1.0, 3.0)).toBe(1.0);
    expect(clamp(3.5, 1.0, 3.0)).toBe(3.0);
  });

  it('should handle edge case when min equals max', () => {
    expect(clamp(5, 3, 3)).toBe(3);
  });
});
