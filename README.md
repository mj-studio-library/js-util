## JavaScript utilities for MJ Studio

![JS Check](https://github.com/mym0404/mj-studio-js-util/workflows/JS%20Check/badge.svg)

---
### Install

```
yarn add @mj-studio/js-util
npm install @mj-studio/js-util
```

---
### Usage

* `isPromise` : check is promise
* `isPlainObject` : check is plain object
* `camelCase` : convert snake_case string to camelCase
* `camelCaseObject` : convert keys of object to camelCased 
* `convertJsonKeys` : convert keys of json object to something others
* `reverseObjectKeyValues` : reverse key and value in object

#### Promise helper
* `withTimeout` : set max running time of promise, if exceeds it will reject.
* `withMinimumResolveTime` : set minimum running time of promise
