import someOfAKind from './someOfAKind';

/**
 * Tests if three matching cards exist in array passed.
 * @param {Card[]} cards Cards to check
 */
export default function isThreeOfAKind(cards) {
  return someOfAKind(cards, 3) !== null;
}