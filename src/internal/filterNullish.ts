import is from './is';

export function filterNullish<T>(source: T[]): Exclude<T, null | undefined>[] {
  return source.filter((item) => !is.null(item) && !is.undefined(item)) as Exclude<
    T,
    null | undefined
  >[];
}
