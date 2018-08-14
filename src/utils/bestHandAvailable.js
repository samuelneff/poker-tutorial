import evaluateHand from './evaluateHand';
import handSorter from './handSorter';

/**
 * Given an array of seven cards, finds the best five card hand.
 * 
 * @param {Card[]} allCards Combination of community and hole cards
 */
export default function bestHandAvailable(allCards) {
  let bestHand = evaluateHand(allCards.slice(0, 5));
  const len = allCards.length;
  for (let skipOne = 0; skipOne < len; skipOne++) {
    for (let skipTwo = skipOne + 1; skipTwo < len; skipTwo++) {
      const cardsInHand = allCards.filter((card, index) => index !== skipOne && index !== skipTwo);
      const hand = evaluateHand(cardsInHand);
      const compared = handSorter(bestHand, hand);
      if (compared > 0) {
        bestHand = hand;
      }
    }
  }
  return bestHand;
}
