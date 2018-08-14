/**
 * Tests all cards have same suit.
 * 
 * @param {Card[]} cards 
 */
export default function isFlush(cards) {
  const firstSuit = cards[0].suit;
  return cards.every(card => card.suit === firstSuit);
}
