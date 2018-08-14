/**
 * Performs an asynchronous action on each element of the array sequentially
 * @param {any[]} array 
 * @param {Function} callback 
 */
export default async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    // sequential execution by design
    // eslint-disable-next-line no-await-in-loop
    await callback(array[index], index, array);
  }
}
