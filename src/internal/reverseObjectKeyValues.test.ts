import reverseObjectKeyValues from './reverseObjectKeyValues';

it('all string or number values are converted', () => {
  const source = { name: 'hi', age: 1 };
  const dest = { hi: 'name', '1': 'age' };

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
