import asyncForEach from './asyncForEach';
import timeout from './timeout';

/**
 * Calls each function with the specified delay between each
 * @param {number} milliseconds Delay between function calls
 * @param {Function[]} funcs Functions to call
 */
export default async function asyncRunWithDelayBetween(milliseconds, ...funcs) {
  await asyncForEach(
    funcs,
    async (fn, index) => {
      if (index) {
        await timeout(milliseconds);
      }
      fn();
    }
  );
}
