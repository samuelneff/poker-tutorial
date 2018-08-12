import someOfAKind from './someOfAKind';

/**
 * Returns array of three matching cards if found.
 * @param {Card[]} cards Cards to check
 */
export default function threeOfAKind(cards) {
  return someOfAKind(cards, 3);
}