import byRankAndSuitDescSorter from './byRankAndSuitDescSorter';
import byRankAndSuitSorter from './byRankAndSuitSorter';
import cardKey from './cardKey';
import createHand from './createHand';
import {
  HAND_ROYAL_FLUSH,
  HAND_STRAIGHT_FLUSH,
  HAND_FOUR_OF_A_KIND,
  HAND_FULL_HOUSE,
  HAND_FLUSH,
  HAND_STRAIGHT,
  HAND_THREE_OF_A_KIND,
  HAND_TWO_PAIR,
  HAND_ONE_PAIR,
  HAND_HIGH_CARD,
  HANDS_RANKED,
  RANK_ACE
} from './constants';
import fourOfAKind from './fourOfAKind';
import isFlush from './isFlush';
import isStraight from './isStraight';
import pair from './pair';
import restOfHand from './restOfHand';
import threeOfAKind from './threeOfAKind';

const handEvaluators = {
  [HAND_ROYAL_FLUSH]: function handRoyalFlush(cards) {
    return isStraight(cards) && isFlush(cards) && cards.slice().sort(byRankAndSuitSorter)[4].rank === RANK_ACE
      ? { cardsInRank: cards.slice() }
      : null;
  },

  [HAND_STRAIGHT_FLUSH]: function handStraightFlush(cards) {
    return isStraight(cards) && isFlush(cards)
      ? { cardsInRank: cards.slice() }
      : null;
  },

  [HAND_FOUR_OF_A_KIND]: function handFourOfAKind(cards) {
    const four = fourOfAKind(cards);
    return four === null 
      ? null
      : { cardsInRank: four };
  },

  [HAND_FULL_HOUSE]: function handFullHouse(cards) {
    const threes = threeOfAKind(cards);
    if (threes === null) {
      return null;
    }
    const rest = restOfHand(cards, threes);
    return rest[0].rank === rest[1].rank
      ? null
      : { cardsInRank: threes.sort(byRankAndSuitSorter).concat(rest.sort(byRankAndSuitSorter)) };
  },

  [HAND_FLUSH]: function handFlush(cards) {
    return isFlush(cards)
      ? { cardsInRank: cards.slice() }
      : null;
  },

  [HAND_STRAIGHT]: function handStraight(cards) {
    return isStraight(cards)
      ? { cardsInRank: cards.slice().sort(byRankAndSuitSorter) }
      : null;
  },

  [HAND_THREE_OF_A_KIND]: function handThreeOfAKind(cards) {
    const threes = threeOfAKind(cards);
    return threes === null
      ? null
      : { cardsInRank: cards };
  },

  [HAND_TWO_PAIR]: function handTwoPair(cards) {
    const firstPair = pair(cards);
    if (firstPair === null) {
      return null;
    }
    const rest = restOfHand(cards, firstPair);
    const secondPair = pair(rest);
    return secondPair === null
      ? null
      : { cardsInRank: firstPair.concat(secondPair).sort(byRankAndSuitDescSorter) };
  },

  [HAND_ONE_PAIR]: function handOnePair(cards) {
    const found = pair(cards);
    return found === null
      ? null
      : { cardsInRank: found };
  },

  [HAND_HIGH_CARD]: function handHighCard(cards) {
    const high = cards.slice().sort(byRankAndSuitSorter)[cards.length];
    return { cardsInRank: [ high ] };
  },
  
};

/**
 * Calculates the best hand for a given set of cards
 * @param {Card[]} cardsInHand
 */
export default function evaluateHand(cardsInHand) {
  const handsCount = HANDS_RANKED.length;
  for (let i = 0; i < handsCount; i++) {
    const handRef = HANDS_RANKED[i];
    const partialHand = handEvaluators[handRef](cardsInHand);
    if (partialHand !== null) {
      return createHand(
        {
          cardsInHand,
          handRef,
          ...partialHand,
        }
      );
    }
  }

  throw new Error(`No matches found for hand; impossible. Cards: ${cardsInHand && cardsInHand.map(cardKey)}`);
}
