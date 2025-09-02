import { vi } from 'vitest';

import { withTimeout } from './withTimeout';

vi.useRealTimers();

const RUNNING_TIME_MILLI = 1000;

const createResolvePromise = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, RUNNING_TIME_MILLI);
  });

const RejectError = new Error();

const createRejectPromise = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(RejectError);
    }, RUNNING_TIME_MILLI);
  });

it('resolved value is resolved when timeout is longer than running time', async () => {
  const result = await withTimeout(RUNNING_TIME_MILLI * 2, createResolvePromise());

  expect(result).toBe(1);
});

it('timeout error is invoked when timeout is shorter than running time', async () => {
  expect.assertions(1);

  try {
    await withTimeout(RUNNING_TIME_MILLI * 0.5, createResolvePromise());
  } catch (e) {
    expect(e).toBeTruthy();
  }
});

it('reject error is invoked when timeout is longer than running time and argument promise is rejected', async () => {
  expect.assertions(1);

  try {
    await withTimeout(RUNNING_TIME_MILLI * 2, createRejectPromise());
  } catch (e) {
    expect(e).toBe(RejectError);
  }
});
