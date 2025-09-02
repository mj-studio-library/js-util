import { toFixedIfNeed } from './toFixedIfNeed';

it('toFixedIfNeed', () => {
  expect(toFixedIfNeed(undefined, 2)).toBe('');
  expect(toFixedIfNeed(10, 2)).toBe('10');
  expect(toFixedIfNeed(1.22222, 2)).toBe('1.22');
  expect(toFixedIfNeed(1.22222, 0)).toBe('1');
  expect(toFixedIfNeed(1.66666, 0)).toBe('2');
  expect(toFixedIfNeed(1.66666, 1)).toBe('1.7');
  expect(toFixedIfNeed(1.05, 1)).toBe('1.1');
});
