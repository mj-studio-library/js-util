import words from './words';

describe('words', () => {
  it('splits ascii sentence into words', () => {
    expect(words('fred, barney, & pebbles')).toEqual(['fred', 'barney', 'pebbles']);
  });

  it('supports custom match pattern', () => {
    expect(words('fred, barney, & pebbles', /[^, ]+/g)).toEqual(['fred', 'barney', '&', 'pebbles']);
  });

  it('splits camelCase words when unicode matcher is needed', () => {
    expect(words('fooBar')).toEqual(['foo', 'Bar']);
  });

  it('returns empty array when no words are matched', () => {
    expect(words('')).toEqual([]);
    expect(words('&&&&')).toEqual([]);
  });
});
