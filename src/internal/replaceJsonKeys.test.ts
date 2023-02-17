import replaceJsonKeys from "./replaceJsonKeys";

it('Falsy values return itself', () => {
  expect(replaceJsonKeys(undefined, {})).toBeUndefined();
  expect(replaceJsonKeys(null, {})).toBeNull();
  // @ts-ignore
  expect(replaceJsonKeys('', {})).toEqual('');
});


it('simple', () => {
  expect(replaceJsonKeys({ a: 1 }, { a: 'b' })).toEqual({ a: 'b' });
  expect(replaceJsonKeys({ a: 1 }, { a: (value) => value * 2})).toEqual({ a: 2 });
});

it('complex', () => {
  expect(
    replaceJsonKeys(
      {
        current_user_high_ratio_100: 99.7,
        after_user_high_ratio_100: 99.1,
        need_problem_number: 2,
        is_problem_exist: true,
      },
      { current_user_high_ratio_100: 'userHighRatio' },
    ),
  ).toEqual({
    current_user_high_ratio_100: 'userHighRatio',
    after_user_high_ratio_100: 99.1,
    need_problem_number: 2,
    is_problem_exist: true,
  });
});

it('strip undefined', () => {
  expect(replaceJsonKeys({ a: 1, b: undefined }, {  })).toEqual({ a: 1 });
  expect(replaceJsonKeys({ a: 1, b: undefined }, { a: () => undefined })).toEqual({  });
  expect(replaceJsonKeys({ a: 1, b: undefined }, { a: () => undefined }, false)).toEqual({ a: undefined, b: undefined });
});
