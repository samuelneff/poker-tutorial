/**
 * Determines if two card objects represent the same card (rank/suit)
 * 
 * @param {Card} x 
 * @param {Card} y 
 */
export default function cardsEqual(x, y) {
  return x === y || (x.rank === y.rank && y.suit === x.suit);
}
