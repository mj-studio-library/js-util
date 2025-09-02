import { is } from './is';

describe('type', () => {
  it('integerString', () => {
    expect(is.integerString('')).toBe(false);
    expect(is.integerString('-')).toBe(false);
    expect(is.integerString('  ')).toBe(false);
    expect(is.integerString('a')).toBe(false);
    expect(is.integerString('1,000')).toBe(false);
    expect(is.integerString('0')).toBe(true);
    expect(is.integerString('-0')).toBe(true);
    expect(is.integerString('1')).toBe(true);
    expect(is.integerString('1.1')).toBe(false);
    expect(is.integerString('1111111111111111')).toBe(true);
    expect(is.integerString('-1111111111111111')).toBe(true);
  });

  it('numberString', () => {
    expect(is.numberString('')).toBe(false);
    expect(is.numberString('-')).toBe(false);
    expect(is.numberString('  ')).toBe(false);
    expect(is.numberString('a')).toBe(false);
    expect(is.numberString('1,000')).toBe(false);
    expect(is.numberString('0')).toBe(true);
    expect(is.numberString('-0')).toBe(true);
    expect(is.numberString('1')).toBe(true);
    expect(is.numberString('1.1')).toBe(true);
    expect(is.numberString('1111111111111111')).toBe(true);
    expect(is.numberString('-1111111111111111')).toBe(true);
  });

  it('function', () => {
    function a() {}

    expect(is.function(a)).toBe(true);
    expect(is.function(() => {})).toBe(true);

    expect(is.function(1)).toBe(false);
    expect(is.function('str')).toBe(false);
    expect(is.function({})).toBe(false);
    expect(is.function([])).toBe(false);
  });

  it('array', () => {
    const array = [1];

    expect(is.array(array)).toBe(true);
  });
});

describe('check', () => {
  it('emptyArray - not array', () => {
    const arr: any = 1;

    expect(is.emptyArray(arr)).toBe(false);
  });

  it('notEmptyArray - not array', () => {
    const arr: any = 'hi';

    expect(is.emptyArray(arr)).toBe(false);
  });

  it('emptyArray', () => {
    const arr: number[] = [];

    expect(is.emptyArray(arr)).toBe(true);
    expect(is.notEmptyArray(arr)).toBe(false);

    arr.push(1);

    expect(is.emptyArray(arr)).toBe(false);
    expect(is.notEmptyArray(arr)).toBe(true);
  });
});
