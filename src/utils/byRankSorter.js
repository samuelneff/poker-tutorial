import mixinBaseSorter from './mixinBaseSorter';
import { CARD_RANK_INDEX_LOOKUP, SUIT_LOOKUP } from './constants';

/**
 * Determines sort order for cards by rank
 * 
 * @param {Card} x First card
 * @param {Card} y Second card
 */
function byRankSorter(x, y) {
  const xIndex = CARD_RANK_INDEX_LOOKUP[x.rank];
  const yIndex = CARD_RANK_INDEX_LOOKUP[y.rank];
  if (xIndex !== yIndex) {
    return xIndex - yIndex;
  }

  // cards are technical equal now, but for consistency we'll sort
  // suits too, especially helps with testing
  const xSuit = SUIT_LOOKUP[x.suit];
  const ySuit = SUIT_LOOKUP[y.suit];  
  return xSuit - ySuit;
}

export default mixinBaseSorter(byRankSorter);
