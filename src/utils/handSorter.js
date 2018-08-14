// several functions follow a defined pattern and not all
// use the arguments, but best to keep consistent so turning off eslint rule
/* eslint-disable no-unused-vars */
import cardRankIndex from './cardRankIndex';
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
  HAND_HIGH_CARD
} from './constants';
import mixinBaseSorter from './mixinBaseSorter';

function compareHandsByRankAtIndex(x, y, index) {
  const xRank = cardRankIndex(x.cardsInRank[index]);
  const yRank = cardRankIndex(y.cardsInRank[index]);
  return xRank - yRank;
}

function compareHandsHighCard(x, y) {
  const xRank = cardRankIndex(x.highCard);
  const yRank = cardRankIndex(y.highCard);
  // higher is better, so reverse rank here
  return yRank - xRank;
}

const equalHandComparers = {
  [HAND_ROYAL_FLUSH]: function compareHandsWithRoyalFlush(x, y) {
    return 0;
  },

  [HAND_STRAIGHT_FLUSH]: function compareHandsWithStraightFlush(x, y) {
    return 0;
  },

  [HAND_FOUR_OF_A_KIND]: function compareHandsWithFourOfAKind(x, y) {
    const rankCompare = compareHandsByRankAtIndex(x, y, 0);
    if (rankCompare !== 0) {
      return rankCompare;
    }
    return compareHandsHighCard(x, y);
  },

  [HAND_FULL_HOUSE]: function compareHandsWithFullHouse(x, y) {
    const threeCompare = compareHandsByRankAtIndex(x, y, 0);
    return threeCompare === 0
      ? compareHandsByRankAtIndex(x, y, 3)
      : threeCompare;
  },

  [HAND_FLUSH]: function compareHandsWithFlush(x, y) {
    return compareHandsByRankAtIndex(x, y, 0);
  },

  [HAND_STRAIGHT]: function compareHandsWithStraight(x, y) {
    return compareHandsByRankAtIndex(x, y, 4);
  },

  [HAND_THREE_OF_A_KIND]: function compareHandsWithThreeOfAKind(x, y) {
    const threeCompare = compareHandsByRankAtIndex(x, y, 0);
    return threeCompare === 0
      ? compareHandsHighCard(x, y)
      : threeCompare;
  },

  [HAND_TWO_PAIR]: function compareHandsWithTwoPair(x, y) {
    const xFirstRank = cardRankIndex(x.cardsInRank[0]);
    const yFirstRank = cardRankIndex(y.cardsInRank[0]);
    const xSecondRank = cardRankIndex(x.cardsInRank[2]);
    const ySecondRank = cardRankIndex(y.cardsInRank[2]);

    const xMaxRank = Math.max(xFirstRank, xSecondRank);
    const yMaxRank = Math.max(yFirstRank, ySecondRank);

    if (xMaxRank !== yMaxRank) {
      return xMaxRank - yMaxRank;
    }

    const xMinRank = Math.min(xFirstRank, xSecondRank);
    const yMinRank = Math.min(xFirstRank, ySecondRank);
    if (xMinRank !== yMinRank) {
      return xMinRank - yMinRank;
    }

    return compareHandsHighCard(x, y);    
  },

  [HAND_ONE_PAIR]: function compareHandsWithOnePair(x, y) {
    const pairCompare = compareHandsByRankAtIndex(x, y, 0);
    return pairCompare === 0
      ? compareHandsHighCard(x, y)
      : pairCompare;
  },

  [HAND_HIGH_CARD]: function compareHandsWithHighCard(x, y) {
    return compareHandsHighCard(x, y);
  },
  
};

/**
 * Evaluates which hand is better, for sorting or comparison
 * @param {Hand} x 
 * @param {Hand} y 
 */
function handSorter(x, y) {
  const xr = x.handRank;
  const yr = y.handRank;
  const rankTest = xr - yr;
  if (rankTest !== 0) {
    return rankTest;
  }  

  return equalHandComparers[x.handRef](x, y);
}

export default mixinBaseSorter(handSorter);
