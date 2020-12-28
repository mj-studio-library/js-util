export default function doBatch<T, R>(list: T[], work: (list: T[], batchIndex: number) => R, batchCount: number): R[] {
  if (!Array.isArray(list)) return;

  let batchIndex = 0;
  let batchIteration = Math.floor(list.length / batchCount);

  if (list.length % batchCount !== 0) {
    batchIteration++;
  }

  const returns: R[] = [];

  for (let i = 0; batchIndex < batchIteration; i += batchCount) {
    const batch = list.slice(i, i + batchCount);

    returns.push(work(batch, batchIndex));
    batchIndex++;
  }

  return returns;
}
