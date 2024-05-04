import words from '../words';

export function snakeCase(str: string): string {
  return words(str.replace(/['\u2019]/g, '')).reduce(
    (result: string, word: string, index: number) =>
      result + (index ? '_' : '') + word.toLowerCase(),
    '',
  );
}
