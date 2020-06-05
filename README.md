# async-wrapus

Wrapper for async functions without pain.
No try catches anymore.

[![NPM](https://img.shields.io/npm/v/async-wrapus.svg)](https://www.npmjs.com/package/async-wrapus)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Badges](https://badgen.net/npm/license/async-wrapus)](https://www.npmjs.com/package/async-wrapus)
[![Badges](https://badgen.net/npm/dependents/async-wrapus)](https://www.npmjs.com/package/async-wrapus)
[![Badges](https://badgen.net/npm/types/async-wrapus)](https://www.npmjs.com/package/async-wrapus)
[![Badges](https://badgen.net/github/issues/kolengri/async-wrapus)](https://www.npmjs.com/package/async-wrapus)
[![Badges](https://badgen.net/bundlephobia/min/async-wrapus)](https://bundlephobia.com/result?p=async-wrapus)
[![Badges](https://badgen.net/bundlephobia/minzip/async-wrapus)](https://bundlephobia.com/result?p=async-wrapus)

## Description

Wrapper returns array of Error object and Result.
In case function throws no exception it will return `[null, resultObject]`.
In case function throws with exception it will return `[Error, null]`.

## Install

```bash
npm install --save async-wrapus
```

```bash
yarn add  async-wrapus
```

## Usage

```tsx
import asyncWrap from 'async-wrapus';

const asyncRequest = async () => {
  // Can throw exception!
  return await someApiRequest();
};

const someMethod = async () => {
  /**
   * err: null | Error
   * result: Result of asyncRequest | null
   */
  const [err, result] = await asyncWrap(asyncRequest());

  if (err) {
    // do something with exception
  }

  if (result) {
    // do something with result
  }
};
```
