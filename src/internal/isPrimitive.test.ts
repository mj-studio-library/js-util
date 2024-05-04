import isPrimitive from './isPrimitive';

it('test', () => {
  expect(isPrimitive(null)).toStrictEqual(true);
  expect(isPrimitive(undefined)).toStrictEqual(true);
  expect(isPrimitive(1)).toStrictEqual(true);
  expect(isPrimitive(0)).toStrictEqual(true);
  expect(isPrimitive('')).toStrictEqual(true);
  expect(isPrimitive('a')).toStrictEqual(true);
  expect(isPrimitive(new Error())).toStrictEqual(false);
  expect(isPrimitive({})).toStrictEqual(false);
  expect(isPrimitive([])).toStrictEqual(false);
});
