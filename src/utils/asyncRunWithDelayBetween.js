import asyncForEach from './asyncForEach';
import timeout from './timeout';

/**
 * Calls each function with the specified delay between each
 * @param {number} miliseconds Delay between function calls
 * @param {Function[]} funcs Functions to call
 */
export default async function asyncRunWithDelayBetween(miliseconds, ...funcs) {
  await asyncForEach(
    funcs,
    async (fn, index) => {
      if (index) {
        await timeout(miliseconds);
      }
      fn();
    }
  );
}
