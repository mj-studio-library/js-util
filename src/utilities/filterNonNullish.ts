import { is } from './is';

/**
 * Filters out null and undefined values from an array
 *
 * @param source - Array to filter
 * @returns New array with null and undefined values removed
 *
 * @example
 * filterNonNullish([1, null, 2, undefined, 3]) // Returns: [1, 2, 3]
 *
 * @example
 * filterNonNullish(['a', null, 'b', undefined]) // Returns: ['a', 'b']
 */
export function filterNonNullish<T>(source: T[]): Exclude<T, null | undefined>[] {
  return source.filter((item) => !is.null(item) && !is.undefined(item)) as Exclude<
    T,
    null | undefined
  >[];
}
