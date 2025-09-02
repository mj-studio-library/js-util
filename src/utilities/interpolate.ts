/**
 * Maps a value from one range to another range with optional extrapolation control
 *
 * @param value - The input value to interpolate
 * @param inputRange - The input range as [min, max]
 * @param outputRange - The output range as [min, max]
 * @param extrapolate - How to handle values outside input range: 'extend' (default) or 'clamp'
 * @returns The interpolated value in the output range
 *
 * @example
 * interpolate({ value: 50, inputRange: [0, 100], outputRange: [0, 1] }) // Returns: 0.5
 * interpolate({ value: 150, inputRange: [0, 100], outputRange: [0, 1], extrapolate: 'clamp' }) // Returns: 1
 * interpolate({ value: 25, inputRange: [0, 100], outputRange: [100, 0] }) // Returns: 75
 */
export const interpolate = ({
  value,
  inputRange,
  outputRange,
  extrapolate = 'extend',
}: {
  value: number;
  inputRange: [number, number];
  outputRange: [number, number];
  extrapolate?: 'clamp' | 'extend';
}): number => {
  const [inputMin, inputMax] = inputRange;
  const [outputMin, outputMax] = outputRange;

  if (extrapolate === 'clamp') {
    if (value <= inputMin) {
      return outputMin;
    }

    if (value >= inputMax) {
      return outputMax;
    }
  }

  const progress = (value - inputMin) / (inputMax - inputMin);

  return outputMin + progress * (outputMax - outputMin);
};
