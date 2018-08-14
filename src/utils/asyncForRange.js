/**
 * Performs an asynchronous action for a range of indexes
 * @param {number} start
 * @param {number} stop 
 * @param {Function} callback 
 */
export default async function asyncForRange(start, stop, callback) {
  for (let index = start; index < stop; index++) {
    // await in loop intentional, we mean do perform the actions sequentially
    // eslint-disable-next-line no-await-in-loop
    await callback(index);
  }
}
