import { numberWithComma } from './numberWithComma';

it('numberWithCommas', () => {
  expect(numberWithComma(700000)).toBe('700,000');
  expect(numberWithComma(100)).toBe('100');
  expect(numberWithComma(1000000)).toBe('1,000,000');
  expect(numberWithComma(4000)).toBe('4,000');
  expect(numberWithComma(10000)).toBe('10,000');
  expect(numberWithComma(39900)).toBe('39,900');
  expect(numberWithComma(0)).toBe('0');
  expect(numberWithComma(1)).toBe('1');
  expect(numberWithComma(999)).toBe('999');
  expect(numberWithComma(1111.111)).toBe('1,111.111');
});
