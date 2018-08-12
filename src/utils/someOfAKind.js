/**
 * Returns cards that match the number in common from the specifie card array, or
 * null if no matches with target count.
 * 
 * @param {Card[]} cards Cards to check
 * @param {number} targetCount Number of cards to match
 */
export default function someOfAKind(cards, targetCount) {
  for(let i=0; i<targetCount; i++) {
    const rank = cards[i].rank;
    const inKind = cards.filter(card => card.rank === rank);
    if (inKind.length === targetCount) {
      return inKind;
    }
  }
  return null;
}