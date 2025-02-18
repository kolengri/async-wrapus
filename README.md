# async-wrapus

An elegant wrapper for async functions that eliminates the need for try-catch blocks and makes error handling more straightforward.

[![NPM](https://img.shields.io/npm/v/async-wrapus.svg)](https://www.npmjs.com/package/async-wrapus)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Badges](https://badgen.net/npm/license/async-wrapus)](https://www.npmjs.com/package/async-wrapus)
[![Badges](https://badgen.net/npm/dependents/async-wrapus)](https://www.npmjs.com/package/async-wrapus)
[![Badges](https://badgen.net/npm/types/async-wrapus)](https://www.npmjs.com/package/async-wrapus)
[![Badges](https://badgen.net/github/issues/kolengri/async-wrapus)](https://www.npmjs.com/package/async-wrapus)
[![Badges](https://badgen.net/bundlephobia/min/async-wrapus)](https://bundlephobia.com/result?p=async-wrapus)
[![Badges](https://badgen.net/bundlephobia/minzip/async-wrapus)](https://bundlephobia.com/result?p=async-wrapus)

## Description

`async-wrapus` is a lightweight utility that simplifies error handling in asynchronous operations. It transforms the traditional try-catch pattern into a more functional approach, inspired by Go's error handling pattern.

### Why use async-wrapus?

- **Clean Code**: Eliminates nested try-catch blocks that can make code harder to read
- **Type Safety**: Full TypeScript support with proper type inference
- **Predictable Error Handling**: Consistent error handling pattern across your application
- **Zero Dependencies**: Lightweight and simple implementation
- **Universal**: Works in Node.js and browser environments

## Install

```bash
npm install --save async-wrapus
```

```bash
yarn add async-wrapus
```

## Usage

### Basic Example

```tsx
import asyncWrap from 'async-wrapus';

const fetchUserData = async (userId: string) => {
  const [error, data] = await asyncWrap(api.fetchUser(userId));
  
  if (error) {
    console.error('Failed to fetch user:', error.message);
    return null;
  }
  
  return data;
};
```

### Advanced Usage

```tsx
import asyncWrap from 'async-wrapus';

const complexOperation = async () => {
  // Multiple async operations
  const [dbError, dbResult] = await asyncWrap(database.query());
  if (dbError) {
    // Handle database error
    return [dbError, null];
  }

  // Chain operations
  const [apiError, apiResult] = await asyncWrap(api.process(dbResult));
  if (apiError) {
    // Handle API error
    return [apiError, null];
  }

  return [null, { db: dbResult, api: apiResult }];
};

// Using with Promise.all
const batchOperation = async () => {
  
  const operations = [
    Promise.resolve("test"),
    Promise.reject("reject"),
    Promise.resolve("test"),
  ];
  
  const [error, results] = await asyncWrap(Promise.all(operations));
  
  // Check if any operation failed
  if (error) {
    // Handle errors
  }
};


// Using with Promise.all
const batchOperation = async () => {
  const operations = [
    api.operation1(),
    api.operation2(),
    api.operation3()
  ].map(asyncWrap);
  
  const results = await Promise.all(operations);
  
  // Check if any operation failed
  const hasError = results.some(([error]) => error !== null);
  if (hasError) {
    // Handle errors
  }
```

## Return Type

The wrapper returns a tuple (array) with two elements:
- First element: `Error | null` - Error object if operation failed, null if successful
- Second element: `T | null` - Result of the operation if successful, null if failed

```tsx
type AsyncWrapResult<T> = Promise<[Error | null, T | null]>;
```

## Error Handling Examples

```tsx
const [error, result] = await asyncWrap(someAsyncOperation());

// Pattern 1: Early return
if (error) {
  return handleError(error);
}

// Pattern 2: Error logging
if (error) {
  logger.error('Operation failed:', error);
  return fallbackValue;
}

// Pattern 3: Conditional logic
if (error) {
  if (error instanceof NetworkError) {
    // Handle network errors
  } else if (error instanceof ValidationError) {
    // Handle validation errors
  }
}
```

## License

MIT © [kolengri](https://github.com/kolengri)
