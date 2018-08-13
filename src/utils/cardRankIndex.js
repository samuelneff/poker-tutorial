import { CARD_RANK_INDEX_LOOKUP } from './constants'

/**
 * Given a card or rank, returns the index of that rank.
 * @param {Card|string} card 
 */
export default function cardRankIndex(card) {
  return typeof card === 'string'
    ? CARD_RANK_INDEX_LOOKUP[card]
    : card && CARD_RANK_INDEX_LOOKUP[card.rank];
}