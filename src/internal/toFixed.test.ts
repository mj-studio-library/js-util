import { toFixed } from './toFixed';

it('toFixed', () => {
  expect(toFixed(undefined, 2)).toBe('');
  expect(toFixed(10, 2)).toBe('10.00');
  expect(toFixed(1.22222, 2)).toBe('1.22');
  expect(toFixed(1.22222, 0)).toBe('1');
  expect(toFixed(1.66666, 0)).toBe('2');
});
