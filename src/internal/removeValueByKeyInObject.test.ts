import { removeValueByKeyInObject } from './removeValueByKeyInObject';

it('simple case', () => {
  const ret = removeValueByKeyInObject({ a: 1, b: 'string', c: {} }, 'c');
  expect(ret).toStrictEqual({
    b: 'string',
    a: 1,
  });
});

it('complex case', () => {
  const ret = removeValueByKeyInObject({ a: 1, b: 'string', c: {} }, ['a', 'b']);
  expect(ret).toStrictEqual({
    c: {},
  });
});
