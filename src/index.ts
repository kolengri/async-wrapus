/**
 * Wraps an async function or Promise to handle errors gracefully without try-catch blocks
 * 
 * @param promise - Promise or value to be wrapped
 * @returns A tuple containing [error, result]
 * - If successful: [null, T] where T is the resolved value
 * - If error occurs: [Error, null]
 * 
 * @example
 * ```typescript
 * // Basic usage
 * const [error, result] = await asyncWrap(someAsyncFunction())
 * 
 * if (error) {
 *   // Handle error case
 *   console.error(error)
 * } else {
 *   // Handle success case
 *   console.log(result)
 * }
 * ```
 * 
 * @example
 * ```typescript
 * // With API calls
 * const [err, data] = await asyncWrap(fetch('https://api.example.com/data'))
 * 
 * if (err) {
 *   // Handle API error
 * } else {
 *   // Process API response
 * }
 * ```
 */
export const asyncWrap = async <T>(promise: Promise<T> | T) => {
  try {
    const result = await promise;
    return [null, result] as const
  } catch (error) {
    return [error, null] as const
  }
};

export default asyncWrap;
