export function lastMatchIndex(str: string, match: string): number {
  for (let i = str.length - match.length; i >= 0; i--) {
    if (str.substring(i, i + match.length) === match) {
      return i;
    }
  }

  return -1;
}
