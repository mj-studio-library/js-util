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

| Category       | Function                                           | Description                                    |
|----------------|----------------------------------------------------|------------------------------------------------|
| **String**     | `camelCase(str)`                                   | Converts snake_case or kebab-case to camelCase |
|                | `snakeCase(str)`                                   | Converts strings to snake_case format          |
|                | `capitalize(str)`                                  | Capitalizes the first character                |
| **Object**     | `camelCaseObject(obj)`                             | Recursively converts object keys to camelCase  |
|                | `snakeCaseObject(obj)`                             | Recursively converts object keys to snake_case |
|                | `reverseObjectKeyValues(obj)`                      | Swaps keys and values in object                |
|                | `replaceJsonKeysRecursively(obj, options)`         | Replace object keys recursively                |
|                | `replaceJsonValuesRecursively(obj, options)`       | Replace object values recursively              |
| **Array**      | `groupByArray(arr, getKey)`                        | Groups array elements into subarrays           |
|                | `groupByObject(arr, getKey)`                       | Groups array elements into object              |
|                | `doBatch(arr, work, batchCount)`                   | Processes arrays in batches                    |
|                | `unique(arr)`                                      | Removes duplicate values                       |
|                | `generateArray(size)`                              | Creates array [0, 1, 2, ..., size-1]           |
|                | `randomItem(arr)`                                  | Returns random element                         |
|                | `lastOf(arr)`                                      | Returns last element                           |
|                | `toggled(arr, element)`                            | Toggles element in array                       |
| **Promise**    | `withTimeout(ms, promise)`                         | Adds timeout to promises                       |
|                | `withMinimumResolveTime(ms, promise)`              | Ensures minimum resolve time                   |
| **Type Check** | `is.string(value)`                                 | String type check                              |
|                | `is.number(value)`                                 | Number type check (excludes NaN)               |
|                | `is.boolean(value)`                                | Boolean type check                             |
|                | `is.array(value)`                                  | Array type check                               |
|                | `is.function(value)`                               | Function type check                            |
|                | `is.object(value)`                                 | Object type check (excludes null)              |
|                | `is.plainObject(value)`                            | Plain object type check                        |
|                | `is.null(value)`                                   | Null check                                     |
|                | `is.undefined(value)`                              | Undefined check                                |
|                | `is.nullOrUndefined(value)`                        | Null or undefined check                        |
|                | `is.falsy(value)`                                  | Falsy values check                             |
|                | `is.truthy(value)`                                 | Truthy values check                            |
|                | `is.notEmptyString(value)`                         | Non-empty string check                         |
|                | `is.emptyString(value)`                            | Empty string check                             |
|                | `is.numberString(value)`                           | Numeric string check                           |
|                | `is.integerString(value)`                          | Integer string check                           |
|                | `is.notEmptyArray(value)`                          | Non-empty array check                          |
|                | `is.emptyArray(value)`                             | Empty array check                              |
|                | `is.promise(value)`                                | Promise check                                  |
| **Filter**     | `filterJsonKeys(json, keys)`                       | Filter JSON object by keys                     |
|                | `filterNonNullish(arr)`                            | Remove null/undefined from array               |
|                | `filterNonNullishKeys(obj, options)`               | Remove null/undefined from object              |
|                | `removeValueByKeyInObject(obj, key)`               | Remove specific keys from object               |
| **Number**     | `numberWithComma(num)`                             | Format with thousand separators                |
|                | `padZero(num, len)`                                | Pad with leading zeros                         |
|                | `toFixed(num, digits, default)`                    | Safe toFixed with undefined handling           |
|                | `toFixedIfNeed(num, digits)`                       | toFixed that removes trailing zeros            |
|                | `toSiUnitString(num)`                              | Convert to SI units (1.5K, 1.5M)               |
|                | `clamp(value, min, max)`                           | Clamps value between min and max               |
| **Time**       | `parseSecond(seconds)`                             | Parse seconds into time components             |
|                | `formatSec(seconds, format)`                       | Format seconds with various formats            |
|                | `createTimer()`                                    | Timer management                               |
|                | `setIntervalWithTimeout(callback, ms)`             | Clearable intervals                            |
| **Math**       | `interpolate(value, inMin, inMax, outMin, outMax)` | Linear interpolation                           |
|                | `interpolateColor(ratio, startColor, endColor)`    | Color interpolation                            |
| **Misc**       | `formatJson(data)`                                 | Pretty-print JSON with error handling          |
|                | `lastMatchIndex(str, match)`                       | Find last occurrence index                     |

## TypeScript Support

All functions include comprehensive TypeScript type definitions and JSDoc documentation for
excellent IDE support.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## License

MIT © [MJ Studio](https://github.com/mj-studio-library)
