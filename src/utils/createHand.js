import byRankSorter from './byRankSorter';
import { HAND_NAMES, HAND_RANK_LOOKUP, HANDS_WITH_SPECIAL_SORT } from './constants';
import restOfHand from './restOfHand';

/**
 * Returns a new Hand object that fills in hand name and rank from ref
 * 
 * @param {Hand} partialHand Hand data to fill in rest from constants
 * @returns {Hand}
 */
export default function createHand(partialHand = {}) {
  const {
    cardsInHand,
    cardsInRank,
    handRef
  } = partialHand;

  const kickers = restOfHand(cardsInHand, cardsInRank);
  let highCard = null;

  if (kickers.length) {
    kickers.sort(byRankSorter);
    if (cardsInRank.length > 1) {
      highCard = kickers[kickers.length - 1];
    }
  }
  return {
    handRef,
    handName: HAND_NAMES[handRef],
    handRank: HAND_RANK_LOOKUP[handRef],
    highCard,
    cardsInHand: cardsInHand.slice().sort(byRankSorter),
    cardsInRank: HANDS_WITH_SPECIAL_SORT[handRef]
      ? cardsInRank
      : cardsInRank.slice().sort(byRankSorter),
    kickers
  };
}
