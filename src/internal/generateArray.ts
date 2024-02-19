export function generateArray(size: number): number[] {
  if (size < 0) {
    return [];
  }

  return [...new Array(size).keys()];
}
