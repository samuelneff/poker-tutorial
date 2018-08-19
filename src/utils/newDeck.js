
const CARD_RANKS = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
  'J',
  'Q',
  'K',
  'A'
];

const SUITS = [
  'C',
  'D',
  'H',
  'S'
];

/**
 * Creates a new deck of cards array
 * @returns {Array.<{rank: string, suit: string}>}
 */
function newDeck() {

  // /////////////////////////////////////////
  //
  // TUTORIAL
  //
  // Create an array of card object, each of
  // which has a `rank` and `suit` property
  //

}

if (require.main === module) {
  console.log(newDeck());
} else {
  module.exports = newDeck;
}
