import { interpolateColor } from './interpolateColor';

describe('interpolateColor', () => {
  it('should interpolate between two hex colors', () => {
    const result = interpolateColor({
      value: 50,
      inputRange: [0, 100],
      outputRange: ['#000000', '#ffffff'],
    });
    expect(result).toBe('#808080');
  });

  it('should return start color when value is at input min', () => {
    const result = interpolateColor({
      value: 0,
      inputRange: [0, 100],
      outputRange: ['#ff0000', '#00ff00'],
    });
    expect(result).toBe('#ff0000');
  });

  it('should return end color when value is at input max', () => {
    const result = interpolateColor({
      value: 100,
      inputRange: [0, 100],
      outputRange: ['#ff0000', '#00ff00'],
    });
    expect(result).toBe('#00ff00');
  });

  it('should clamp values outside input range', () => {
    const result1 = interpolateColor({
      value: -50,
      inputRange: [0, 100],
      outputRange: ['#ff0000', '#00ff00'],
    });
    expect(result1).toBe('#ff0000');

    const result2 = interpolateColor({
      value: 150,
      inputRange: [0, 100],
      outputRange: ['#ff0000', '#00ff00'],
    });
    expect(result2).toBe('#00ff00');
  });

  it('should handle colors with different cases', () => {
    const result = interpolateColor({
      value: 50,
      inputRange: [0, 100],
      outputRange: ['#FF0000', '#00FF00'],
    });
    expect(result).toBe('#808000');
  });

  it('should handle colors without # prefix', () => {
    const result = interpolateColor({
      value: 50,
      inputRange: [0, 100],
      outputRange: ['ff0000', '00ff00'],
    });
    expect(result).toBe('#808000');
  });
});
