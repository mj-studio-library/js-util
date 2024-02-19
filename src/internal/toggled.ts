export function toggled<T>(arr: T[], element: T): T[] {
  return arr.includes(element) ? arr.filter((e) => e !== element) : [...arr, element];
}
