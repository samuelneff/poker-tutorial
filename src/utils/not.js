/**
 * Generates a function that passes arguments to the underlying function and returns the negated result.
 * @param {Function} fn 
 */
export default function not(fn) {
  return function negate(...args) {
    return !fn.apply(this, args);
  };
}
