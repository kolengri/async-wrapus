import { asyncWrap } from '../index';
import { expect, test, describe } from 'bun:test';

describe(asyncWrap.name, () => {
  // Test successful Promise resolution
  test('should handle successful Promise resolution', async () => {
    const successPromise = Promise.resolve('success');
    const [error, result] = await asyncWrap(successPromise);
    
    expect(error).toBeNull();
    expect(result).toBe('success');
  });

  // Test Promise rejection
  test('should handle Promise rejection', async () => {
    const errorMessage = 'test error';
    const failPromise = Promise.reject(new Error(errorMessage));
    const [error, result] = await asyncWrap(failPromise);
    
    expect(error).toBeInstanceOf(Error);
    expect(error?.message).toBe(errorMessage);
    expect(result).toBeNull();
  });

  // Test with synchronous value
  test('should handle synchronous value', async () => {
    const value = 42;
    const [error, result] = await asyncWrap(value);
    
    expect(error).toBeNull();
    expect(result).toBe(42);
  });

  // Test with async function
  test('should handle async function', async () => {
    const asyncFunc = async () => 'async result';
    const [error, result] = await asyncWrap(asyncFunc());
    
    expect(error).toBeNull();
    expect(result).toBe('async result');
  });

  // Test with throwing async function
  test('should handle throwing async function', async () => {
    const errorMessage = 'async error';
    const throwingAsyncFunc = async () => {
      throw new Error(errorMessage);
    };
    
    const [error, result] = await asyncWrap(throwingAsyncFunc());
    
    expect(error).toBeInstanceOf(Error);
    expect(error?.message).toBe(errorMessage);
    expect(result).toBeNull();
  });

  // Test with fetch-like Promise
  test('should handle fetch-like Promise', async () => {
    const mockResponse = { data: 'test data' };
    const mockFetch = Promise.resolve(mockResponse);
    
    const [error, result] = await asyncWrap(mockFetch);
    
    expect(error).toBeNull();
    expect(result).toEqual(mockResponse);
  });

  // Test with Promise.all successful resolution
  test('should handle Promise.all successful resolution', async () => {
    const promises = [
      Promise.resolve(1),
      Promise.resolve(2),
      Promise.resolve(3)
    ];
    
    const [error, result] = await asyncWrap(Promise.all(promises));
    
    expect(error).toBeNull();
    expect(result).toEqual([1, 2, 3]);
  });

  // Test with Promise.all rejection
  test('should handle Promise.all rejection', async () => {
    const errorMessage = 'promise.all error';
    const promises = [
      Promise.resolve(1),
      Promise.reject(new Error(errorMessage)),
      Promise.resolve(3)
    ];
    
    const [error, result] = await asyncWrap(Promise.all(promises));
    
    expect(error).toBeInstanceOf(Error);
    expect(error?.message).toBe(errorMessage);
    expect(result).toBeNull();
  });

  // Test type safety with Promise.all
  test('type: should handle Promise.all with typed arrays', async () => {
    interface Item {
      id: number;
      value: string;
    }
    
    const items: Item[] = [
      { id: 1, value: 'one' },
      { id: 2, value: 'two' }
    ];
    
    const promises = items.map(item => Promise.resolve(item));
    const [error, result] = await asyncWrap<Item[]>(Promise.all(promises));
    
    expect<null>(error).toBeNull();
    expect<Item[] | null>(result).toEqual(items);
  });

  // Test return type for successful Promise
  test("type: should handle successful Promise", async () => {
    const [error, result] = await asyncWrap(Promise.resolve('test'));
    expect<null>(error).toBeNull();
    expect<string | null>(result).toBe('test');
  });
  
  // Test return type for failed Promise
  test("type: should handle Promise rejection", async () => {
    const error = new Error('test error');
    const [err, result] = await asyncWrap(Promise.reject(error));
    expect<Error>(err!).toBeInstanceOf(Error);
    expect<null>(result).toBeNull();
  });
  
  // Test return type with custom error type
  test("type: should handle custom error type", async () => {
    class CustomError extends Error {
      code: number = 500;
    }
    const customError = new CustomError();
    const [error, result] = await asyncWrap(Promise.reject(customError));
    expect<CustomError>(error as CustomError).toBeInstanceOf(CustomError);
    expect<null>(result).toBeNull();
  });
  
  // Test return type with generic type
  test("type: should handle generic type", async () => {
    interface User {
      id: number;
      name: string;
    }
    
    const testUser: User = { id: 1, name: 'Test' };
    const [error, result] = await asyncWrap<User>(Promise.resolve(testUser));
    expect<null>(error).toBeNull();
    expect<User | null>(result).toEqual(testUser);
  });
  
  // Test return type with synchronous value
  test("type: should handle synchronous value", async () => {
    const [error, result] = await asyncWrap(42);
    expect<null>(error).toBeNull();
    expect<number | null>(result).toBe(42);
  }); 
}); 

