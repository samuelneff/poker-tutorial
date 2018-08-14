import { CARD_RANK_INDEX_LOOKUP } from './constants';
import mixinBaseSorter from './mixinBaseSorter';

/**
 * Determines sort order for cards by rank, lowest rank to highest. Useful for actually comparing card values.
 * 
 * @param {Card} x First card
 * @param {Card} y Second card
 */
// Raw function exported for use in other sort functions, but should not be used on its own.
export function rawByRankOnlySorter(x, y) {
  const xIndex = CARD_RANK_INDEX_LOOKUP[x.rank];
  const yIndex = CARD_RANK_INDEX_LOOKUP[y.rank];
  return xIndex - yIndex;
}

export default mixinBaseSorter(rawByRankOnlySorter);
