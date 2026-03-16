# @mj-studio/js-util

![ogimage-1260-630](https://github.com/mj-studio-library/js-util/assets/33388801/9d345b3c-0353-4cec-b055-d5c018ec68a2)

![JS Check](https://github.com/mym0404/mj-studio-js-util/workflows/JS%20Check/badge.svg)

A comprehensive collection of JavaScript utility functions for modern development. Written in
TypeScript with full type safety and extensive JSDoc documentation.

## Installation

```bash
yarn add @mj-studio/js-util
npm install @mj-studio/js-util
```

## API Reference

### String

#### `camelCase(str: string): string`
Converts a snake_case or kebab-case string to camelCase

```ts
camelCase('user_name') // Returns: 'userName'
camelCase('user-name') // Returns: 'userName'
```

#### `capitalize(str: string): string`
Capitalizes the first character of a string

```ts
capitalize('hello') // Returns: 'Hello'
capitalize('hello world') // Returns: 'Hello world'
```

#### `lastMatchIndex(str: string, match: string): number`
Finds the last occurrence index of a substring in a string

```ts
lastMatchIndex('hello world hello', 'hello') // Returns: 12
```

#### `snakeCase(str: string): string`
Converts a string to snake_case format

```ts
snakeCase('userName') // Returns: 'user_name'
snakeCase('getUserById') // Returns: 'get_user_by_id'
```

### Object

#### `camelCaseObject(objOrArr: JSONCandidate): JSONCandidate`
Recursively converts all object keys to camelCase

```ts
camelCaseObject({ user_name: 'John', user_age: 30 })
// Returns: { userName: 'John', userAge: 30 }
```

#### `replaceJsonKeysRecursively<T extends JSONCandidate>(objOrArr: T, options: Partial<Omit<ReplaceJsonKeyRecursivelyOption, "keyFilter">>): T`
Recursively replaces all object keys in a JSON structure using a replacer function or mapping

```ts
replaceJsonKeysRecursively({ old_key: 'value' }, { replacer: { 'old_key': 'new_key' } })
// Returns: { new_key: 'value' }
```

#### `reverseObjectKeyValues<T extends Record<string, string | number>>(obj: T): T | Record<string, string>`
Reverses the keys and values of an object

```ts
reverseObjectKeyValues({ a: '1', b: '2' })
// Returns: { '1': 'a', '2': 'b' }
```

#### `snakeCaseObject(objOrArr: JSONCandidate): JSONCandidate`
Recursively converts all object keys to snake_case

```ts
snakeCaseObject({ userName: 'John', userAge: 30 })
// Returns: { user_name: 'John', user_age: 30 }
```

#### `replaceJsonValuesRecursively<T extends JSONCandidate>(objOrArr: T, options: Partial<Omit<ReplaceJsonKeysOptions, "keyFilter">>): T`
Recursively replaces values in a JSON structure based on key matching

```ts
replaceJsonValuesRecursively({ name: 'John', age: 30 }, { replacer: { age: 25 } })
// Returns: { name: 'John', age: 25 }
```

### Array

#### `doBatch<T, R>(list: T[], work: (list: T[], batchIndex: number) => R, batchCount: number): R[]`
Processes an array in batches and returns results from each batch

```ts
doBatch([1,2,3,4,5,6], (batch) => batch.reduce((sum, n) => sum + n, 0), 3)
// Processes: [1,2,3], [4,5,6] -> Returns: [6, 15]
```

#### `groupByArray<T, K extends string | number>(collection: T[], getKey: ((element: T) => K) | K): T[][]`
Groups array elements into subarrays based on a key

```ts
groupByArray(users, user => user.age)
// Returns: [[users with age 25], [users with age 30]]
```

#### `groupByObject<T, K extends string | number>(collection: T[], getKey: ((element: T) => K) | K): GroupByObject<T, K>`
Groups array elements into an object based on a key

```ts
groupByObject(users, user => user.age)
// Returns: { 25: [users with age 25], 30: [users with age 30] }
```

#### `generateArray(size: number): number[]`
Generates an array of consecutive numbers from 0 to size-1

```ts
generateArray(5) // Returns: [0, 1, 2, 3, 4]
```

#### `lastOf<T>(arr: T[]): T`
Gets the last element of an array

```ts
lastOf([1, 2, 3, 4]) // Returns: 4
```

#### `randomItem<T>(source: T[]): T`
Selects a random element from an array

```ts
randomItem([1, 2, 3, 4, 5]) // Returns: random number between 1-5
```

#### `toggled<T>(arr: T[], element: T): T[]`
Toggles an element in an array - adds if not present, removes if present

```ts
toggled([1, 2, 3], 4) // Returns: [1, 2, 3, 4]
```

#### `unique<T>(arr: T[]): T[]`
Removes duplicate values from an array

```ts
unique([1, 2, 2, 3, 3, 4])
// Returns: [1, 2, 3, 4]
```

#### `uniqueBy<T, K>(arr: T[], getKey: (value: T) => K): T[]`
Removes duplicate elements from an array by a selected key.

```ts
uniqueBy(
  [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 1, name: 'Alice v2' },
  ],
  (item) => item.id,
)
// Returns: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
```

### Promise

#### `withMinimumResolveTime<T>(minimumMilli: number, promise: Promise<T>): Promise<T>`
Ensures a Promise takes at least a minimum amount of time to resolve

```ts
const result = await withMinimumResolveTime(1000, fetchData())
// Guarantees at least 1 second delay for UX (loading spinners)
```

#### `withTimeout<T>(milli: number, promise: Promise<T>): Promise<T>`
Adds a timeout to a Promise, rejecting if the timeout is exceeded

```ts
const result = await withTimeout(5000, fetchUser(userId))
// Throws error if fetchUser takes more than 5 seconds
```

### Type Check

#### `is.number(candidate: any): candidate is number`
Checks whether the candidate is a valid number.

```ts
is.number(42) // true
```

#### `is.string(candidate: any): candidate is string`
Checks whether the candidate is a string.

```ts
is.string('hello') // true
```

#### `is.integerString(candidate: any): candidate is string`
Checks whether the candidate is an integer string.

```ts
is.integerString('42') // true
```

#### `is.numberString(candidate: any): candidate is string`
Checks whether the candidate is a numeric string.

```ts
is.numberString('3.14') // true
```

#### `is.null(candidate: any): candidate is null`
Checks whether the candidate is null.

```ts
is.null(null) // true
```

#### `is.undefined(candidate: any): candidate is undefined`
Checks whether the candidate is undefined.

```ts
is.undefined(undefined) // true
```

#### `is.nullOrUndefined(candidate: any): candidate is undefined | null`
Checks whether the candidate is null or undefined.

```ts
is.nullOrUndefined(undefined) // true
```

#### `is.falsy<T>(candidate: T | Falsy): candidate is Falsy`
Checks whether the candidate is falsy.

```ts
is.falsy(0) // true
```

#### `is.truthy<T>(candidate: T | Falsy): candidate is T`
Checks whether the candidate is truthy.

```ts
is.truthy('hello') // true
```

#### `is.function<T extends Func, R extends unknown>(candidate: T | R): candidate is T`
Checks whether the candidate is a function.

```ts
is.function(() => 'hello') // true
```

#### `is.object(candidate: any): candidate is Record<string, unknown>`
Checks whether the candidate is a non-null object.

```ts
is.object({ value: 1 }) // true
```

#### `is.plainObject(candidate: any): candidate is Record<string, unknown>`
Checks whether the candidate is a plain object.

```ts
is.plainObject({ value: 1 }) // true
```

#### `is.array<T>(candidate: any): candidate is Array<T>`
Checks whether the candidate is an array.

```ts
is.array([1, 2, 3]) // true
```

#### `is.boolean(candidate: any): candidate is boolean`
Checks whether the candidate is a boolean.

```ts
is.boolean(false) // true
```

#### `is.promise<T>(p: Promise<T> | any): p is Promise<T>`
Checks whether the candidate is a promise.

```ts
is.promise(Promise.resolve(1)) // true
```

#### `is.primitive(candidate: unknown): candidate is string | number | boolean | null | undefined`
Checks whether the candidate is a primitive value.

```ts
is.primitive('hello') // true
```

#### `is.notEmptyString(candidate: any): candidate is string`
Checks whether the candidate is a non-empty string.

```ts
is.notEmptyString('hello') // true
```

#### `is.emptyString(candidate: any): boolean`
Checks whether the candidate is an empty string.

```ts
is.emptyString('') // true
```

#### `is.emptyArray(candidate: any): boolean`
Checks whether the candidate is an empty array.

```ts
is.emptyArray([]) // true
```

#### `is.notEmptyArray<T>(candidate: any): candidate is Array<T>`
Checks whether the candidate is a non-empty array.

```ts
is.notEmptyArray([1, 2, 3]) // true
```

### Filter

#### `filterJsonKeys(x: JSONCandidate, filter: Filter): JSONCandidate`
Filters a JSON structure to include only objects/arrays containing specified keys

```ts
filterJsonKeys({ name: 'John', age: 30, city: 'NYC' }, ['name', 'age'])
// Returns: { name: 'John', age: 30 }
```

#### `filterNonNullish<T>(source: T[]): Exclude<T, null | undefined>[]`
Filters out null and undefined values from an array

```ts
filterNonNullish([1, null, 2, undefined, 3]) // Returns: [1, 2, 3]
```

#### `filterNonNullishKeys<T extends object>(source: T, options?: Options): T`
Filters out object keys with null, undefined, or empty string values

```ts
filterNonNullishKeys({ a: 1, b: null, c: undefined, d: 'hello' })
// Returns: { a: 1, d: 'hello' }
```

#### `removeValueByKeyInObject<T extends Record<string | number, any>>(v: T, key: (string | number) | (string | number)[]): T`
Removes specified keys from an object and returns a new object

```ts
removeValueByKeyInObject({ a: 1, b: 2, c: 3 }, 'b') // Returns: { a: 1, c: 3 }
```

### Number

#### `numberWithComma(x?: number): string`
Adds comma separators to a number for better readability

```ts
numberWithComma(1234567) // Returns: '1,234,567'
```

#### `padZero(number: number | undefined, len?: number): string`
Pads a number with leading zeros to reach the specified length

```ts
padZero(5) // Returns: '05'
padZero(5, 3) // Returns: '005'
```

#### `toFixed(number: number | undefined, fractionDigits: number, defaultString?: string): string`
Safely formats a number to a specified number of decimal places

```ts
toFixed(3.14159, 2) // Returns: '3.14'
toFixed(5, 0) // Returns: '5'
```

#### `toFixedIfNeed(number: number | undefined, fractionDigits: number, defaultString?: string): string`
Formats a number to a fixed decimal places, removing trailing zeros

```ts
toFixedIfNeed(3.1000, 4) // Returns: '3.1'
toFixedIfNeed(5.0, 2) // Returns: '5'
```

#### `toSiUnitString(n: number): string`
Converts a number to a readable string with SI unit suffixes (K, M)

```ts
toSiUnitString(1500) // Returns: '1.5K'
toSiUnitString(2500000) // Returns: '2.5M'
```

#### `clamp(value: number, min: number, max: number): number`
Clamps a number between a minimum and maximum value

```ts
clamp(5, 0, 10) // Returns: 5
clamp(-5, 0, 10) // Returns: 0
clamp(15, 0, 10) // Returns: 10
```

### Time

#### `setIntervalWithTimeout(callback: (clear: () => void) => any, intervalMs: number): () => void`
Creates a repeating timeout that can be cleared from within the callback

```ts
const stop = setIntervalWithTimeout((clear) => {
  console.log('Running...')
  if (someCondition) clear()
}, 1000)
```

#### `TimeoutHandler.clear(): void`
Clears the current timeout and marks the handler as cleared.

```ts
const handler = new TimeoutHandler()
handler.clear()
```

#### `parseSecond(totalSecond?: number): Result`
Parses total seconds into structured time components

```ts
parseSecond(3661) // Returns: { totalDay: 0, totalHour: 1, totalMinute: 61, onlyHour: 1, onlyMinute: 1, onlySecond: 1 }
```

#### `SecFormat.get(type: SecFormats): Formatter`
Returns the formatter for the given second format.

```ts
const formatter = SecFormat.get('mm:ss')
formatter(90) // Returns: '01:30'
```

#### `SecFormat.format(totalSeconds: number, type: SecFormats): string`
Formats total seconds with the given second format.

```ts
SecFormat.format(3661, 'hh:mm:ss') // Returns: '01:01:01'
```

#### `SecFormat.invalidateIntervalSec(type: SecFormats): number`
Returns the cache invalidation interval for the given second format.

```ts
SecFormat.invalidateIntervalSec('mm:ss') // Returns: 1
```

#### `formatSec(totalSeconds: number, type: SecFormats): string`
Alias for SecFormat.format - formats seconds into time string

```ts
formatSec(3661, 'hh:mm:ss') // Returns: '01:01:01'
formatSec(90, 'mm:ss') // Returns: '01:30'
```

#### `createTimer(): { clear: () => void; timeout: (fn: () => void, duration: number, { clear: clearOtherTimers }?: Options) => () => void; }`
Creates a timer utility that manages multiple timeouts with optional clearing

```ts
const timer = createTimer()
timer.timeout(() => console.log('Hello'), 1000)
timer.clear() // Clears all timeouts
```

#### `createTimer().clear(): void`
Clears every timeout created by this timer instance.

```ts
const timer = createTimer()
timer.clear()
```

#### `createTimer().timeout(fn: () => void, duration: number, { clear: clearOtherTimers }?: Options): () => void`
Schedules a timeout and optionally clears earlier timeouts first.

```ts
const timer = createTimer()
timer.timeout(() => console.log('Hello'), 1000)
```

### Math

#### `interpolate({ value, inputRange, outputRange, extrapolate, }: { value: number; inputRange: [number, number]; outputRange: [number, number]; extrapolate?: "clamp" | "extend"; }): number`
Maps a value from one range to another range with optional extrapolation control

```ts
interpolate({ value: 50, inputRange: [0, 100], outputRange: [0, 1] }) // Returns: 0.5
interpolate({ value: 150, inputRange: [0, 100], outputRange: [0, 1], extrapolate: 'clamp' }) // Returns: 1
interpolate({ value: 25, inputRange: [0, 100], outputRange: [100, 0] }) // Returns: 75
```

#### `interpolateColor({ value, inputRange, outputRange, }: { value: number; inputRange: [number, number]; outputRange: [string, string]; }): string`
Interpolates between two hex colors based on a value within an input range

```ts
interpolateColor({ value: 50, inputRange: [0, 100], outputRange: ['#ff0000', '#00ff00'] }) // Returns: '#808000'
interpolateColor({ value: 0, inputRange: [0, 100], outputRange: ['#000000', '#ffffff'] }) // Returns: '#000000'
interpolateColor({ value: 100, inputRange: [0, 100], outputRange: ['#000000', '#ffffff'] }) // Returns: '#ffffff'
```

### Misc

#### `formatJson(a: any): string`
Converts a value to a formatted JSON string representation

```ts
formatJson({ name: 'John', age: 30 }) // Returns: '{\n  "name": "John",\n  "age": 30\n}'
```

## TypeScript Support

All functions include comprehensive TypeScript type definitions and JSDoc documentation for
excellent IDE support.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## License

MIT © [MJ Studio](https://github.com/mj-studio-library)
