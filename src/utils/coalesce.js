/**
 * Returns the first argument that is neither undefined or null. If all arguments are undefined or null,
 * returns the last argument (to allow specifying a specific default value of undefined vs null). If no
 * arguments are passed then returns undefined.
 *
 * @param {Array} args
 * @returns {*}
 */
export default function coalesce(...args) {
  const value = args.find(a => a !== undefined && a !== null);
  return value === undefined && args.length
    ? args[args.length - 1]
    : value;
}
