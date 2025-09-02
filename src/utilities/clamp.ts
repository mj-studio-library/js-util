/**
 * Clamps a number between a minimum and maximum value
 *
 * @param value - The number to clamp
 * @param min - The minimum value
 * @param max - The maximum value
 * @returns The clamped value between min and max
 *
 * @example
 * clamp(5, 0, 10) // Returns: 5
 * clamp(-5, 0, 10) // Returns: 0
 * clamp(15, 0, 10) // Returns: 10
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};
