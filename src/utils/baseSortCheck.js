/* eslint-disable eqeqeq */
/**
 * util for sorters to test for undefined, null, and exact quality.
 * @param {any} x
 * @param {any} y
 * @returns {number|null} If order cay be determined based on undefined/null/exact quality,
 *                        then -1/0/1 are returned, otherwise null
 */
export default function baseSortCheck(x, y) {
  if (x == y) {
    return 0;
  }
  if (x == undefined) {
    return 1;
  }

  if (y == undefined) {
    return -1;
  }

  return null;
}
