import newDeck from './newDeck';

it('shouldReturnArray', shouldReturnArray);
it('shouldReturn52Cards', shouldReturn52Cards);
it('shouldReturn13OfEachSuit', shouldReturnThirteenOfEachSuit);
it('shouldReturn4OfEachRank', shouldReturnFourOfEachRank);
describe('shouldBeShuffled', shouldBeShuffled);

function shouldReturnArray() {
  const deck = newDeck();
  const actual = Array.isArray(deck);
  expect(actual).toBe(true);
}

function shouldReturn52Cards() {
  const deck = newDeck();
  const actual = deck.length;
  expect(actual).toBe(52);
}

function shouldReturnThirteenOfEachSuit() {
  const deck = newDeck();
  let clubs = 0;
  let diamonds = 0;
  let hearts = 0;
  let spades = 0;

  // /////////////////////////////////////////
  //
  // TUTORIAL
  //
  // Implement counting loop to count number
  // of each suit
  //
  // Use forEach to loop over the deck, deck.forEach()
  //
  // Use an arrow function to implement the functionality
  //
  // array.forEach(x => { doStuff() })
  //






  const actual = {
    clubs,
    diamonds,
    hearts,
    spades
  };
  const expected = {
    clubs: 13,
    diamonds: 13,
    hearts: 13,
    spades: 13
  };

  expect(actual).toEqual(expected);
}

function shouldReturnFourOfEachRank() {
  const deck = newDeck();
  const actual = {};

  // /////////////////////////////////////////
  //
  // TUTORIAL
  //
  // Implement counting loop to count number
  // of each rank, 2-9, 0, J, Q, K, A
  //
  // Unlike previous, use map() to convert cards
  // to an array of ranks first, then loop that
  // and use object property access and ternary to
  // create each rank within the object of not there
  // and increment if it is
  //






  const expected = {
    2: 4,
    3: 4,
    4: 4,
    5: 4,
    6: 4,
    7: 4,
    8: 4,
    9: 4,
    0: 4,
    J: 4,
    Q: 4,
    K: 4,
    A: 4
  };

  expect(actual).toEqual(expected);
}

function shouldBeShuffled() {

  // /////////////////////////////////////////
  //
  // TUTORIAL
  //
  // Go back to newDeck.js and add a shuffle()
  // function and call it so that it randomly
  // shuffles the deck of cards.
  //
  // Use a while loop to loop through the deck backwards
  //
  // Math.random() returns a random number from 0 - 1
  //
  // Math.trunc() removes any fractional portion of a decimal
  //


  const rankCounts = {
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    0: 0,
    J: 0,
    Q: 0,
    K: 0,
    A: 0
  };

  const suitCounts = {
    C: 0,
    D: 0,
    H: 0,
    S: 0
  };

  for (let i = 0; i < 250; i++) {
    const deck = newDeck();
    deck.forEach((card, index) => {
      rankCounts[card.rank] += index;
      suitCounts[card.suit] += index;
    });
  }

  const rankAverage = Object.values(rankCounts).reduce((acc, val) => acc + val, 0) / Object.keys(rankCounts).length;
  const suitAvereage = Object.values(suitCounts).reduce((acc, val) => acc + val, 0) / Object.keys(suitCounts).length;

  Object.entries(rankCounts).forEach(([rank, count]) => {
    const actual = Math.abs(count - rankAverage) / rankAverage;
    it(
      `Rank ${rank} count ${count} should be within 10% of average ${rankAverage}`,
      () => expect(actual).toBeLessThan(0.05));
  });

  Object.entries(suitCounts).forEach(([suit, count]) => {
    const actual = Math.abs(count - suitAvereage) / suitAvereage;
    it(
      `Suit ${suit} count ${count} should be within 10% of average ${suitAvereage}`,
      () => expect(actual).toBeLessThan(0.05));
  });
}
