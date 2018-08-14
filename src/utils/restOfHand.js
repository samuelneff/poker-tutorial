import cardKey from './cardKey';
import toLookup from './toLookup';

/**
 * Given two array of cards, returns cards in the first array not in the second.
 * @param {Card[]} cardsInHand 
 * @param {Card[]} cardsToRemove 
 */
export default function restOfHand(cardsInHand, cardsToRemove) {

  if (cardsToRemove.length === cardsInHand.length) {
    return [];
  }

  const cardsToRemoveLookup = toLookup(cardsToRemove, cardKey);
  return cardsInHand.filter(card => !cardsToRemoveLookup[cardKey(card)]);
}
