/**
 * Returns a new array with generated items between each
 * @param {any[]} array 
 * @param {Function} generator 
 */
export default function interpolate(array, generator) {
  if (!Array.isArray(array)) {
    return array;
  }
  const interpolated = [];
  const last = array.length - 1;
  array.forEach(
    (item, index) => {
      interpolated.push(item);
      if (index !== last) {
        interpolated.push(generator(item, interpolated.length));
      }
    }
  )
  return interpolated;
}