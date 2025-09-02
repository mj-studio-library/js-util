/**
 * Processes an array in batches and returns results from each batch
 *
 * @param list - Array to process in batches
 * @param work - Function to execute for each batch
 * @param batchCount - Number of items per batch
 * @returns Array of results from each batch execution
 *
 * @example
 * doBatch([1,2,3,4,5,6], (batch) => batch.reduce((sum, n) => sum + n, 0), 3)
 * // Processes: [1,2,3], [4,5,6] -> Returns: [6, 15]
 *
 * @example
 * doBatch(userIds, async (batch) => await fetchUsers(batch), 10)
 * // Process users in batches of 10
 */
export function doBatch<T, R>(
  list: T[],
  work: (list: T[], batchIndex: number) => R,
  batchCount: number,
): R[] {
  if (!Array.isArray(list)) {
    return;
  }

  let batchIndex = 0;
  const batchIteration = Math.floor((list.length + batchCount - 1) / batchCount);

  const returns: R[] = [];

  for (let i = 0; batchIndex < batchIteration; i += batchCount) {
    const batch = list.slice(i, i + batchCount);

    returns.push(work(batch, batchIndex));
    batchIndex++;
  }

  return returns;
}
