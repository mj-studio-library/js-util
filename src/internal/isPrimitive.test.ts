import isPrimitive from './isPrimitive';

it('test', () => {
  expect(isPrimitive(null)).toEqual(true);
  expect(isPrimitive(undefined)).toEqual(true);
  expect(isPrimitive(1)).toEqual(true);
  expect(isPrimitive(0)).toEqual(true);
  expect(isPrimitive('')).toEqual(true);
  expect(isPrimitive('a')).toEqual(true);
  expect(isPrimitive(new Error())).toEqual(false);
  expect(isPrimitive({})).toEqual(false);
  expect(isPrimitive([])).toEqual(false);
});
