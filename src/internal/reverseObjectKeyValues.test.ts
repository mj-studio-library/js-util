import { reverseObjectKeyValues } from './reverseObjectKeyValues';

it('Fasly values return itself', () => {
  expect(reverseObjectKeyValues(undefined)).toBeUndefined();
  expect(reverseObjectKeyValues(null)).toBeNull();
  // @ts-ignore
  expect(reverseObjectKeyValues('')).toStrictEqual('');
});

it('not object values return itself', () => {
  // @ts-ignore
  expect(reverseObjectKeyValues('str')).toStrictEqual('str');

  // @ts-ignore
  expect(reverseObjectKeyValues(123)).toStrictEqual(123);

  // @ts-ignore
  expect(reverseObjectKeyValues(true)).toStrictEqual(true);

  // @ts-ignore
  expect(reverseObjectKeyValues([1, 2, 3])).toStrictEqual([1, 2, 3]);
});

it('all string or number values are converted', () => {
  const source = { name: 'hi', age: 1 };
  const dest = { hi: 'name', 1: 'age' };

  expect(reverseObjectKeyValues(source)).toStrictEqual(dest);
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
