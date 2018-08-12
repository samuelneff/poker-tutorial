import mixinBaseSorter from './mixinBaseSorter';

/**
 * Determins sort order for two numbers
 * 
 * @param {number} x First number
 * @param {number} y Second number
 */
function numericSorter(x, y) {
  return x - y;
}

export default mixinBaseSorter(numericSorter);
