import cardFromText from './cardFromText';

/**
 * Given a string of cards like "AS, 5C, JD" returns a cards array, Ace of Spades, Five of Clubs, and Jack of Diamonds.
 * @param {string} cardsText 
 * @returns {Card[]}
 */
export default function cardArrayFromTextList(cardsText) {
  if (typeof cardsText !== 'string') {
    throw new Error(`Provided cardText is not a string, it's a(n) '${typeof cardsText}': ${cardsText}`);
  }  

  if (cardsText.length === 0) {
    return [];
  }
  
  return cardsText.split(/, ?| /).map(cardFromText);
}
