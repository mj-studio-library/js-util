import { toSiUnitString } from './toSiUnitString';

it('toSIUnitString', () => {
  expect(toSiUnitString(undefined as any)).toBe('');
  expect(toSiUnitString(-1_000_000)).toBe('-1000000');
  expect(toSiUnitString(0)).toBe('0');
  expect(toSiUnitString(999)).toBe('999');
  expect(toSiUnitString(1000)).toBe('1K');
  expect(toSiUnitString(1100)).toBe('1.1K');
  expect(toSiUnitString(1999)).toBe('1.9K');
  expect(toSiUnitString(999999)).toBe('999.9K');
  expect(toSiUnitString(1000000)).toBe('1M');
  expect(toSiUnitString(1099999)).toBe('1M');
  expect(toSiUnitString(1100000)).toBe('1.1M');
  expect(toSiUnitString(100000000)).toBe('100M');
});
