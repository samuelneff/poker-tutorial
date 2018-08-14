import echo from './echo';

/**
 * Creates a lookup object from an array, optionally with a key generator.
 * @param {any[]} array Array to convert
 * @param {Function} keyGenerator Key generator from array item
 * @param {Function} valueGenerator Item generator for value of lookup
 */
export default function toLookup(array, keyGenerator = echo, valueGenerator = echo) {
  if (!Array.isArray(array)) {
    return {};
  }
  return array.reduce(
    (lookup, item, index) => {
      const key = keyGenerator(item, index);
      // eslint-disable-next-line no-param-reassign
      lookup[key] = valueGenerator(item, index);
      return lookup;
    },
    {}
  );
}
