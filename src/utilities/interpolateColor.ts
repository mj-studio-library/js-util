import { clamp } from './clamp';

const hexToRgb = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    throw new Error('Invalid hex color');
  }

  return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
};

const rgbToHex = (r: number, g: number, b: number): string => {
  const toHex = (n: number) => Math.round(n).toString(16).padStart(2, '0');

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

/**
 * Interpolates between two hex colors based on a value within an input range
 *
 * @param value - The input value to interpolate color for
 * @param inputRange - The input range as [min, max]
 * @param outputRange - The output color range as [startColor, endColor] in hex format
 * @returns The interpolated color as a hex string
 *
 * @example
 * interpolateColor({ value: 50, inputRange: [0, 100], outputRange: ['#ff0000', '#00ff00'] }) // Returns: '#808000'
 * interpolateColor({ value: 0, inputRange: [0, 100], outputRange: ['#000000', '#ffffff'] }) // Returns: '#000000'
 * interpolateColor({ value: 100, inputRange: [0, 100], outputRange: ['#000000', '#ffffff'] }) // Returns: '#ffffff'
 */
export const interpolateColor = ({
  value,
  inputRange,
  outputRange,
}: {
  value: number;
  inputRange: [number, number];
  outputRange: [string, string];
}): string => {
  const [inputMin, inputMax] = inputRange;
  const [colorStart, colorEnd] = outputRange;

  const progress = clamp((value - inputMin) / (inputMax - inputMin), 0, 1);

  const [r1, g1, b1] = hexToRgb(colorStart);
  const [r2, g2, b2] = hexToRgb(colorEnd);

  const r = r1 + progress * (r2 - r1);
  const g = g1 + progress * (g2 - g1);
  const b = b1 + progress * (b2 - b1);

  return rgbToHex(r, g, b);
};
