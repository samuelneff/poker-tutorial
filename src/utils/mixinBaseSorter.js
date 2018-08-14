import baseSortCheck from './baseSortCheck';

/**
 * Wraps any sort function with a sorter that evaluates undefined, null, and exact equality
 * @param {function(x:any, y:any):number} sorter Sort function
 */
export default function mixinBaseSorter(sorter) {
  return function baseSorterMixedIn(x, y) {
    const base = baseSortCheck(x, y);
    return base === null
      ? sorter(x, y)
      : base;
  };
}
