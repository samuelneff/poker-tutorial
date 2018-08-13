import { 
  CARD_RANK_INDEX_LOOKUP, 
  CARD_RANKS,
  SUITS,
  SUIT_LOOKUP 
} from '../constants';

/**
 * Converts a string representing a card to a card instance.
 * 
 * @param {string} cardText String representing a card like 2C for Two of Clubs
 * @returns {Card}
 */
export default function cardFromText(cardText) {
  if (typeof cardText !== 'string') {
    throw new Error(`Invalid card text found '${cardText}' (${typeof cardText}); must be a string.`);
  }  
  if (cardText.length === 0) {
    return null;
  }
  if (cardText.length !== 2) {
    throw new Error(`Invalid card text found '${cardText}'; must be two characters.`);
  }

  const card = {
    rank: cardText[0],
    suit: cardText[1]
  };

  if (CARD_RANK_INDEX_LOOKUP[card.rank] === undefined) {
    throw new Error(`Invalid card text '${cardText}'; Rank ${card.rank} should be one of '${CARD_RANKS.join('\', \'')}'.`);
  }

  if (SUIT_LOOKUP[card.suit] === undefined) {
    throw new Error(`Invalid card text '${cardText}'; Suit ${card.suit} should be one of '${SUITS.join('\', \'')}'.`);
  }

  return card;
}
