/**
 * Given a current index and list of items, returns the next turn index; zero
 * if current is null or at end of list, and current plus one otherwise.
 * @param {number|null} current
 * @param {any[]} list
*/
export default function rotateNext(current, list) {
  return current === null
    ? 0
    : (current + 1) % list.length;
}