/**
 * Performs an asynchronous action for a range of indexes
 * @param {number} start
 * @param {number} stop 
 * @param {Function} callback 
 */
export default async function asyncForRange(start, stop, callback) {
  for (let index = start; index < stop; index++) {
    await callback(index)
  }
}