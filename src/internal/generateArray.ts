export function generateArray(size: number): number[] {
  if (size < 0) {
    return [];
  }

  const ret = [];
  for (let i = 0; i < size; i++) {
    ret.push(i);
  }

  return ret;
}
