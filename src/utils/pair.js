import someOfAKind from './someOfAKind';
/**
 * Finds a pair of cards within an array of cards.
 * 
 * @param {Card[]} cards 
 * @returns {Card[]}
 */
export default function pair(cards) {
  return someOfAKind(cards, 2);  
}
