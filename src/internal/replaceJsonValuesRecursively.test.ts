import { replaceJsonValuesRecursively } from './replaceJsonValuesRecursively';

it('Falsy values return itself', () => {
  expect(replaceJsonValuesRecursively(undefined, {})).toBeUndefined();
  expect(replaceJsonValuesRecursively(null, {})).toBeNull();
  // @ts-ignore
  expect(replaceJsonValuesRecursively('', {})).toStrictEqual('');
});

it('simple', () => {
  expect(replaceJsonValuesRecursively({ a: 1 }, { replacer: { a: 'b' } })).toStrictEqual({
    a: 'b',
  });

  expect(
    replaceJsonValuesRecursively({ a: 1 }, { replacer: { a: (value) => value * 2 } }),
  ).toStrictEqual({
    a: 2,
  });
});

it('complex', () => {
  expect(
    replaceJsonValuesRecursively(
      {
        current_user_high_ratio_100: 99.7,
        after_user_high_ratio_100: 99.1,
        need_problem_number: 2,
        is_problem_exist: true,
      },
      { replacer: { current_user_high_ratio_100: 'userHighRatio' } },
    ),
  ).toStrictEqual({
    current_user_high_ratio_100: 'userHighRatio',
    after_user_high_ratio_100: 99.1,
    need_problem_number: 2,
    is_problem_exist: true,
  });
});

it('nested', () => {
  expect(
    replaceJsonValuesRecursively(
      {
        a: 0,
        b: 0,
        c: 2,
        d: {
          e: 5,
          a: 0,
        },
      },
      { replacer: { a: 1 } },
    ),
  ).toStrictEqual({
    a: 1,
    b: 0,
    c: 2,
    d: {
      e: 5,
      a: 1,
    },
  });

  expect(
    replaceJsonValuesRecursively(
      {
        a: 0,
        b: 0,
        c: 2,
        d: {
          e: 5,
          a: [1, 2, 3],
        },
      },
      { replacer: { a: 1 } },
    ),
  ).toStrictEqual({
    a: 1,
    b: 0,
    c: 2,
    d: {
      e: 5,
      a: 1,
    },
  });
});

it('postLeafTransform', () => {
  expect(
    replaceJsonValuesRecursively(
      {
        current_user_high_ratio_100: 99.7,
        after_user_high_ratio_100: 99.1,
        need_problem_number: 2,
        is_problem_exist: true,
      },
      {
        replacer: { current_user_high_ratio_100: 'userHighRatio' },
        postLeafTransform: (t) => `$${t}$`,
      },
    ),
  ).toStrictEqual({
    current_user_high_ratio_100: '$userHighRatio$',
    after_user_high_ratio_100: '$99.1$',
    need_problem_number: '$2$',
    is_problem_exist: '$true$',
  });
});

it('strip undefined', () => {
  expect(
    replaceJsonValuesRecursively({ a: 1, b: undefined }, { stripUndefined: true }),
  ).toStrictEqual({
    a: 1,
  });

  expect(
    replaceJsonValuesRecursively({ a: 1, b: undefined }, { replacer: { a: () => undefined } }),
  ).toStrictEqual({ a: undefined, b: undefined });

  expect(
    replaceJsonValuesRecursively(
      { a: 1, b: undefined },
      { stripUndefined: false, replacer: { a: () => undefined } },
    ),
  ).toStrictEqual({ a: undefined, b: undefined });
});
