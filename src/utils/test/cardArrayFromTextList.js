import cardFromText from './cardFromText';

/**
 * Given a string of cards like "AS, 5C, JD" returns a cards array, Ace of Spades, Five of Clubs, and Jack of Diamonds.
 * @param {string} cardsText 
 * @returns {Card[]}
 */
export default function cardArrayFromTextList(cardsText) {
  if (typeof cardsText !== 'string') {
    throw new Error(`Requested convert cardTextToArray but cardText is not a string, it is '${typeof cardsText}': ${cardsText}`);
  }  

  if (cardsText.length === 0) {
    return [];
  }
  
  return cardsText.split(/,\s*/).map(cardFromText);
}