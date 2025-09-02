import { interpolate } from './interpolate';

describe('interpolate', () => {
  it('should interpolate value within range', () => {
    expect(interpolate({ value: 50, inputRange: [0, 100], outputRange: [0, 1] })).toBe(0.5);
    expect(interpolate({ value: 25, inputRange: [0, 100], outputRange: [0, 1] })).toBe(0.25);
    expect(interpolate({ value: 75, inputRange: [0, 100], outputRange: [0, 1] })).toBe(0.75);
  });

  it('should extrapolate beyond range by default', () => {
    expect(interpolate({ value: 150, inputRange: [0, 100], outputRange: [0, 1] })).toBe(1.5);
    expect(interpolate({ value: -50, inputRange: [0, 100], outputRange: [0, 1] })).toBe(-0.5);
  });

  it('should clamp values when extrapolate is "clamp"', () => {
    expect(
      interpolate({ value: 150, inputRange: [0, 100], outputRange: [0, 1], extrapolate: 'clamp' }),
    ).toBe(1);

    expect(
      interpolate({ value: -50, inputRange: [0, 100], outputRange: [0, 1], extrapolate: 'clamp' }),
    ).toBe(0);
  });

  it('should handle reverse ranges', () => {
    expect(interpolate({ value: 50, inputRange: [0, 100], outputRange: [1, 0] })).toBe(0.5);
    expect(interpolate({ value: 25, inputRange: [0, 100], outputRange: [100, 0] })).toBe(75);
  });

  it('should handle negative ranges', () => {
    expect(interpolate({ value: -50, inputRange: [-100, 0], outputRange: [0, 1] })).toBe(0.5);
    expect(interpolate({ value: 0, inputRange: [-100, 100], outputRange: [-1, 1] })).toBe(0);
  });
});
