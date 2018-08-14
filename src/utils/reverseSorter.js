/**
 * Given a sorter, returns a new sorter that sorts in the reverse order.
 * 
 * @param {function(x:any, y:any):number} sorter 
 * @returns {function(x:any, y:any):number}
 */
export default function reverseSorter(sorter) {
  return function reverseSortImpl(x, y) {
    return -sorter(x, y);
  };
}
