/**
 * Performs an asynchronous action on each element of the array sequentially
 * @param {any[]} array 
 * @param {Function} callback 
 */
export default async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}