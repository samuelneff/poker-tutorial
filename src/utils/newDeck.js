import { CARD_RANKS, SUITS } from './constants';
import shuffle from './shuffle';

export default function newDeck() {
  const deck = [];
  CARD_RANKS.forEach(
    rank =>
      SUITS.forEach(
        suit =>
          deck.push({ rank, suit })
      )
  );
  return shuffle(deck);
}
