import cardRankIndex from './cardRankIndex';
import numericSorter from './numericSorter';

/**
 * Test all cards are in sequential rank.
 * 
 * @param {Card[]} cards 
 */
export default function isStraight(cards) {
  const orderedRanks = cards.map(cardRankIndex).sort(numericSorter);
  return orderedRanks.every((rankIndex, index) => {
    if (index === 0) {
      return true;
    }
    const lastRank = orderedRanks[index - 1];
    return lastRank === rankIndex - 1;
  });
}
