import someOfAKind from './someOfAKind';

/**
 * Returns array of four matching cards if found.
 * @param {Card[]} cards Cards to check
 */
export default function fourOfAKind(cards) {
  return someOfAKind(cards, 4);
}