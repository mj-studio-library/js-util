export default function doBatch<T>(list: T[], work: (list: T[], batchIndex: number) => any, batchCount: number) {
  if (!Array.isArray(list)) return;

  let batchIndex = 0;
  let batchIteration = Math.floor(list.length / batchCount);

  if (list.length % batchCount !== 0) {
    batchIteration++;
  }

  for (let i = 0; batchIndex < batchIteration; i += batchCount) {
    const batch = list.slice(i, i + batchCount);

    work(batch, batchIndex);
    batchIndex++;
  }
}
