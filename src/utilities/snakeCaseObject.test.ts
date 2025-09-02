import { describe, expect, it } from 'vitest';

import { snakeCaseObject } from './snakeCaseObject';

describe('snakeCaseObject', () => {
  it('converts object keys to snake_case', () => {
    const input = { userName: 'John', userAge: 30 };
    const expected = { user_name: 'John', user_age: 30 };
    expect(snakeCaseObject(input)).toEqual(expected);
  });

  it('recursively converts nested object keys', () => {
    const input = {
      userInfo: {
        firstName: 'John',
        lastName: 'Doe',
      },
    };

    const expected = {
      user_info: {
        first_name: 'John',
        last_name: 'Doe',
      },
    };
    expect(snakeCaseObject(input)).toEqual(expected);
  });

  it('handles arrays of objects', () => {
    const input = [
      { firstName: 'John', lastName: 'Doe' },
      { firstName: 'Jane', lastName: 'Smith' },
    ];

    const expected = [
      { first_name: 'John', last_name: 'Doe' },
      { first_name: 'Jane', last_name: 'Smith' },
    ];
    expect(snakeCaseObject(input)).toEqual(expected);
  });

  it('handles mixed arrays with objects and primitives', () => {
    const input = [{ firstName: 'John' }, 'string', 123, null, { userAge: 30 }];

    const expected = [{ first_name: 'John' }, 'string', 123, null, { user_age: 30 }];
    expect(snakeCaseObject(input)).toEqual(expected);
  });

  it('handles nested arrays in objects', () => {
    const input = {
      userData: [{ firstName: 'John' }, { lastName: 'Doe' }],
    };

    const expected = {
      user_data: [{ first_name: 'John' }, { last_name: 'Doe' }],
    };
    expect(snakeCaseObject(input)).toEqual(expected);
  });

  it('returns null unchanged', () => {
    expect(snakeCaseObject(null)).toBe(null);
  });

  it('returns zero unchanged', () => {
    expect(snakeCaseObject(0)).toBe(0);
  });

  it('returns falsy values unchanged', () => {
    expect(snakeCaseObject(undefined)).toBe(undefined);
    expect(snakeCaseObject(false)).toBe(false);
    expect(snakeCaseObject('')).toBe('');
  });

  it('returns primitive values unchanged', () => {
    expect(snakeCaseObject('string')).toBe('string');
    expect(snakeCaseObject(123)).toBe(123);
    expect(snakeCaseObject(true)).toBe(true);
  });

  it('handles empty objects', () => {
    expect(snakeCaseObject({})).toEqual({});
  });

  it('handles empty arrays', () => {
    expect(snakeCaseObject([])).toEqual([]);
  });

  it('handles deeply nested structures', () => {
    const input = {
      userInfo: {
        personalData: {
          fullName: 'John Doe',
          dateOfBirth: '1990-01-01',
        },
        addressInfo: {
          streetAddress: '123 Main St',
          zipCode: '12345',
        },
      },
    };

    const expected = {
      user_info: {
        personal_data: {
          full_name: 'John Doe',
          date_of_birth: '1990-01-01',
        },
        address_info: {
          street_address: '123 Main St',
          zip_code: '12345',
        },
      },
    };
    expect(snakeCaseObject(input)).toEqual(expected);
  });

  it('handles complex nested arrays and objects', () => {
    const input = {
      userList: [
        {
          personalInfo: { firstName: 'John' },
          contactDetails: [{ emailAddress: 'john@example.com' }],
        },
      ],
    };

    const expected = {
      user_list: [
        {
          personal_info: { first_name: 'John' },
          contact_details: [{ email_address: 'john@example.com' }],
        },
      ],
    };
    expect(snakeCaseObject(input)).toEqual(expected);
  });

  it('handles objects with various value types', () => {
    const input = {
      stringValue: 'test',
      numberValue: 42,
      booleanValue: true,
      nullValue: null,
      undefinedValue: undefined,
      arrayValue: [1, 2, 3],
      objectValue: { nestedKey: 'value' },
    };

    const expected = {
      string_value: 'test',
      number_value: 42,
      boolean_value: true,
      null_value: null,
      undefined_value: undefined,
      array_value: [1, 2, 3],
      object_value: { nested_key: 'value' },
    };
    expect(snakeCaseObject(input)).toEqual(expected);
  });

  it('does not mutate original object', () => {
    const input = { userName: 'John', userAge: 30 };
    const original = { userName: 'John', userAge: 30 };
    const result = snakeCaseObject(input);

    expect(input).toEqual(original);
    expect(result).not.toBe(input);
  });

  it('handles keys that are already snake_case', () => {
    const input = { user_name: 'John', user_age: 30 };
    const expected = { user_name: 'John', user_age: 30 };
    expect(snakeCaseObject(input)).toEqual(expected);
  });

  it('handles mixed case keys', () => {
    const input = {
      'camelCase': 'value1',
      'snake_case': 'value2',
      'PascalCase': 'value3',
      'kebab-case': 'value4',
    };

    const expected = {
      'camel_case': 'value1',
      'snake_case': 'value2',
      'pascal_case': 'value3',
      'kebab-case': 'value4', // Note: kebab-case conversion depends on snakeCase implementation
    };
    expect(snakeCaseObject(input)).toEqual(expected);
  });

  it('handles Date objects as values', () => {
    const date = new Date('2023-01-01');
    const input = { createdAt: date };
    const expected = { created_at: date };
    expect(snakeCaseObject(input)).toEqual(expected);
  });

  it('handles function values (should remain unchanged)', () => {
    const fn = () => 'test';
    const input = { callbackFunction: fn };
    const expected = { callback_function: fn };
    expect(snakeCaseObject(input)).toEqual(expected);
  });

  it('handles arrays of primitives', () => {
    const input = [1, 'string', true, null, undefined];
    const expected = [1, 'string', true, null, undefined];
    expect(snakeCaseObject(input)).toEqual(expected);
  });
});
