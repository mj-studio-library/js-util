export default function withTimeout<T>(milli: number, promise: Promise<T>): Promise<T> {
  return Promise.race([
    promise,
    new Promise((resolve, reject) =>
      setTimeout(() => {
        reject(new Error('Promise timeout in withTimeout<T>'));
      }, milli),
    ),
  ]) as Promise<T>;
}
