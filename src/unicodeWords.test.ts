import { unicodeWords } from './unicodeWords';

describe('unicodeWords', () => {
  it('splits basic latin words', () => {
    expect(unicodeWords('fred, barney, & pebbles')).toEqual(['fred', 'barney', 'pebbles']);
  });

  it('splits camel case and numbers', () => {
    expect(unicodeWords('fooBar 200OK')).toEqual(['foo', 'Bar', '200', 'OK']);
  });

  it('matches ordinal numbers', () => {
    expect(unicodeWords('1st 2ND 3rd 44TH')).toEqual(['1st', '2ND', '3rd', '44TH']);
  });

  it('returns null when nothing can be matched', () => {
    expect(unicodeWords('&, -')).toBeNull();
  });
});
