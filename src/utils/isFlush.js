/**
 * Tests all cards have same suit.
 * 
 * @param {Card[]} cards 
 */
export default function isFlush(cards) {
  let firstSuit = cards[0].suit;
  return cards.every(card => card.suit === firstSuit);
}