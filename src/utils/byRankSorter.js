import mixinBaseSorter from './mixinBaseSorter';
import { CARD_RANK_INDEX_LOOKUP } from './constants';

/**
 * Determins sort order for cards by rank
 * 
 * @param {Card} x First card
 * @param {Card} y Second card
 */
function byRankSorter(x, y) {
  const xIndex = CARD_RANK_INDEX_LOOKUP[x.rank];
  const yIndex = CARD_RANK_INDEX_LOOKUP[y.rank];
  return xIndex - yIndex;
}

export default mixinBaseSorter(byRankSorter);