import replaceJsonKeysRecursively from './replaceJsonKeysRecursively';

it('Falsy values return itself', () => {
  expect(replaceJsonKeysRecursively(undefined, {})).toBeUndefined();
  expect(replaceJsonKeysRecursively(null, {})).toBeNull();
  expect(replaceJsonKeysRecursively('', {})).toStrictEqual('');
});

it('simple', () => {
  expect(replaceJsonKeysRecursively({ a: 1 }, { replacer: { a: 'b' } })).toStrictEqual({ b: 1 });
  expect(replaceJsonKeysRecursively({ a: 1 }, { replacer: { a: 'c' } })).toStrictEqual({
    c: 1,
  });
});

it('nested', () => {
  expect(
    replaceJsonKeysRecursively(
      {
        a: 0,
        b: 0,
        c: 2,
        d: {
          e: 5,
          a: 0,
          d: {
            asd: {
              a: [1, 2, 3, 4, { b: { c: { a: 1 } } }],
            },
          },
        },
      },
      { replacer: { a: 'hello' } },
    ),
  ).toStrictEqual({
    hello: 0,
    b: 0,
    c: 2,
    d: {
      e: 5,
      hello: 0,
      d: {
        asd: {
          hello: [1, 2, 3, 4, { b: { c: { hello: 1 } } }],
        },
      },
    },
  });
});

it('strip undefined', () => {
  expect(
    replaceJsonKeysRecursively({ a: 1, b: undefined }, { stripUndefined: true }),
  ).toStrictEqual({
    a: 1,
  });

  expect(
    replaceJsonKeysRecursively({ a: 1, b: undefined }, { replacer: { a: 'c' } }),
  ).toStrictEqual({
    c: 1,
    b: undefined,
  });

  expect(
    replaceJsonKeysRecursively(
      { a: 1, b: undefined },
      { stripUndefined: false, replacer: { a: 'c' } },
    ),
  ).toStrictEqual({ c: 1, b: undefined });
});
