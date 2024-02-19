export function randomItem<T>(source: T[]): T {
  return source[Math.floor(Math.random() * source.length)];
}
