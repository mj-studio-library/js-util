import reverseObjectKeyValues from './reverseObjectKeyValues';

it('Fasly values return itself', () => {
  expect(reverseObjectKeyValues(undefined)).toBeUndefined();
  expect(reverseObjectKeyValues(null)).toBeNull();
  // @ts-ignore
  expect(reverseObjectKeyValues('')).toEqual('');
});

it('not object values return itself', () => {
  // @ts-ignore
  expect(reverseObjectKeyValues('str')).toEqual('str');

  // @ts-ignore
  expect(reverseObjectKeyValues(123)).toEqual(123);

  // @ts-ignore
  expect(reverseObjectKeyValues(true)).toEqual(true);

  // @ts-ignore
  expect(reverseObjectKeyValues([1, 2, 3])).toEqual([1, 2, 3]);
});

it('all string or number values are converted', () => {
  const source = { name: 'hi', age: 1 };
  const dest = { hi: 'name', 1: 'age' };

  expect(reverseObjectKeyValues(source)).toEqual(dest);
});

it('any non - string or number values are thrown error', () => {
  expect.assertions(1);

  const source = { name: 'hi', age: [1, 2, 3] };

  try {
    // @ts-ignore
    reverseObjectKeyValues(source);
  } catch (e) {
    expect(e).toBeTruthy();
  }
});
