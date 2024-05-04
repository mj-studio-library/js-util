import { snakeCase } from './snakeCase';

it('simple', () => {
  expect(snakeCase('ABCDE')).toBe('abcde');
  expect(snakeCase('contentItems')).toBe('content_items');
  expect(snakeCase('contentItems2')).toBe('content_items_2');
});
