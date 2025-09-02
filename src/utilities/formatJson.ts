import { is } from './is';

/**
 * Converts a value to a formatted JSON string representation
 *
 * @param a - Value to format as JSON string
 * @returns Formatted string representation of the input value
 *
 * @example
 * formatJson({ name: 'John', age: 30 }) // Returns: '{\n  "name": "John",\n  "age": 30\n}'
 *
 * @example
 * formatJson('hello') // Returns: 'hello'
 * formatJson(123) // Returns: '123'
 */
export function formatJson(a: any) {
  if (is.number(a) || is.string(a) || !a) {
    return a + '';
  }

  try {
    return JSON.stringify(a, null, 2);
  } catch {
    return 'Error';
  }
}
