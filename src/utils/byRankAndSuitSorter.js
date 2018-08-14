import { rawByRankOnlySorter } from './byRankOnlySorter';
import { SUIT_LOOKUP } from './constants';
import mixinBaseSorter from './mixinBaseSorter';

/**
 * Determines sort order for cards by rank and suit, lowest rank to highest rank, alpha suits. Useful for sorting
 * by rank and in a predictable suit order, but not good for comparison of value since suits do not actually have
 * value.
 *
 * @param {Card} x First card
 * @param {Card} y Second card
 */
function byRankAndSuitSorter(x, y) {
  const byRank = rawByRankOnlySorter(x, y);
  if (byRank) {
    return byRank;
  }

  // cards are technical equal now, but for consistency we'll sort
  // suits too, especially helps with testing
  const xSuit = SUIT_LOOKUP[x.suit];
  const ySuit = SUIT_LOOKUP[y.suit];
  return xSuit - ySuit;
}

export default mixinBaseSorter(byRankAndSuitSorter);
