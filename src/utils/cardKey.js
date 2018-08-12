/**
 * A key that represents the card's rank and suit.
 * 
 * @param {Card} card The card to convert to a key
 */
export default function cardKey(card) {
  return card && `${card.rank} ${card.suit}`;
}