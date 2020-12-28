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
      console.log(list);
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
