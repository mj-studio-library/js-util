import doBatch from './doBatch';

it('simple', () => {
  expect.assertions(3);

  doBatch(
    [1, 2, 3],
    (list) => {
      expect(list.length).toBe(1);
    },
    1,
  );
});

it('complex', () => {
  expect.assertions(3);

  doBatch(
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    (list) => {
      expect(list.length).toBeCloseTo(3, -1);
    },
    4,
  );
});

it('complex 2', () => {
  expect.assertions(1);

  doBatch(
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    (list) => {
      expect(list.length).toBe(10);
    },
    100,
  );
});

it('complex 3', () => {
  expect.assertions(2);

  doBatch(
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    (list) => {
      expect(list.length).toBe(5);
    },
    5,
  );
});

it('not array', () => {
  expect.assertions(0);
  doBatch(undefined as any, () => {}, 4);
});

it('simple return', () => {
  const returns = doBatch(
    [1, 2, 3],
    (list) => {
      return list[0];
    },
    1,
  );

  expect(returns).toHaveLength(3);
  expect(returns[0]).toBe(1);
});

it('Promise return', async () => {
  const returns = doBatch(
    [1, 2, 3],
    async (list) => {
      return list[0];
    },
    1,
  );

  expect(returns).toHaveLength(3);
  expect(await returns[0]).toBe(1);
  expect(await Promise.all(returns)).toEqual([1, 2, 3]);
});
