/**
 * Returns a new array with the items shuffled, Knuth Fisher Yates Shuffle algorithm
 * @param {Array} array Array to shuffle
 * @returns {Array}
 */
export default function shuffle(array) {
  const shuffled = array.slice();
  const max = shuffled - 1;
  for (let i = max; i; i--) {
    const j = Math.trunc(Math.random() * (i + 1));
    const swap = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = swap;
  }
  return shuffled;
}
