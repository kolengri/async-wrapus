# async-wrapper

[![NPM](https://img.shields.io/npm/v/async-wrapper.svg)](https://www.npmjs.com/package/async-wrapper)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Badges](https://badgen.net/npm/license/async-wrapper)](https://www.npmjs.com/package/async-wrapper)
[![Badges](https://badgen.net/npm/dependents/async-wrapper)](https://www.npmjs.com/package/async-wrapper)
[![Badges](https://badgen.net/npm/types/async-wrapper)](https://www.npmjs.com/package/async-wrapper)
[![Badges](https://badgen.net/github/issues/kolengri/async-wrapper)](https://www.npmjs.com/package/async-wrapper)
[![Badges](https://badgen.net/bundlephobia/min/async-wrapper)](https://bundlephobia.com/result?p=async-wrapper)
[![Badges](https://badgen.net/bundlephobia/minzip/async-wrapper)](https://bundlephobia.com/result?p=async-wrapper)

## Description

Wrapper for async functions without pain.
No try catches anymore.


Wrapper returns array of Error object and Result. 
In case function throws no exception it will return `[null, resultObject]`.
In case function throws with exception it will return `[Error, null]`.

## Install

```bash
npm install --save async-wrapper
```

```bash
yarn add  async-wrapper
```



## Usage

```tsx
    import asyncWrap from 'async-wrapper';

    const asyncRequest = async () => {
        // Can throw exception!
        return await someApiRequest()
    }

    const someMethod = async () => {
        /**
         * err: null | Error
         * result: Result of asyncRequest | null
         */
        const [err, result] = await asyncWrap(asyncRequest());

        if(err) {
            // do something with exception
        }

        if(result) {
            // do something with result
        }
    }
```
