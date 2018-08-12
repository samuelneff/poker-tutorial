import someOfAKind from './someOfAKind';

/**
 * Tests if four matching cards exist in array passed.
 * @param {Card[]} cards Cards to check
 */
export default function isFourOfAKind(cards) {
  return someOfAKind(cards, 4) !== null;
}