import { vi } from 'vitest';

import { withMinimumResolveTime } from './withMinimumResolveTime';

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

it('running time > min time => resolve immediately', async () => {
  const start = Date.now();

  await withMinimumResolveTime(RUNNING_TIME_MILLI / 2, createResolvePromise());

  const diff = Date.now() - start;

  expect(diff).toBeGreaterThanOrEqual(RUNNING_TIME_MILLI);
});

it('resolve time < min time => wait min time', async () => {
  const start = Date.now();

  await withMinimumResolveTime(RUNNING_TIME_MILLI * 2, createResolvePromise());

  const diff = Date.now() - start;

  expect(diff).toBeGreaterThanOrEqual(RUNNING_TIME_MILLI * 2);
});

it('error => reject immediately', async () => {
  expect.assertions(2);

  const start = Date.now();

  try {
    await withMinimumResolveTime(RUNNING_TIME_MILLI * 10, createRejectPromise());
  } catch (e) {
    const diff = Date.now() - start;

    expect(e).toBe(RejectError);
    expect(diff).toBeLessThanOrEqual(RUNNING_TIME_MILLI * 10);
  }
});
