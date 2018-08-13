import toLookup from './toLookup';
import echo from './echo';

export const RANK_TWO = '2';
export const RANK_THREE = '3';
export const RANK_FOUR = '4';
export const RANK_FIVE = '5';
export const RANK_SIX = '6';
export const RANK_SEVEN = '7';
export const RANK_EIGHT = '8';
export const RANK_NINE = '9';
export const RANK_TEN = '0';
export const RANK_JACK = 'J';
export const RANK_QUEEN = 'Q';
export const RANK_KING = 'K';
export const RANK_ACE = 'A';

export const CARD_RANKS = [
  RANK_TWO,
  RANK_THREE,
  RANK_FOUR,
  RANK_FIVE,
  RANK_SIX,
  RANK_SEVEN,
  RANK_EIGHT,
  RANK_NINE,
  RANK_TEN,
  RANK_JACK,
  RANK_QUEEN,
  RANK_KING,
  RANK_ACE
];

export const CARD_RANK_INDEX_LOOKUP = toLookup(CARD_RANKS, echo, (rank, index) => index);

export const SUIT_CLUBS = 'C';
export const SUIT_DIAMONDS = 'D';
export const SUIT_HEARTS = 'H';
export const SUIT_SPADES = 'S';

export const SUITS = [
  SUIT_CLUBS,
  SUIT_DIAMONDS,
  SUIT_HEARTS,
  SUIT_SPADES
];

export const SUIT_LOOKUP = toLookup(SUITS, echo, (suit, index) => index);

export const PLAY_LAG_MILLISECONDS = 250;
export const SMALL_BLIND_AMOUNT = 1;
export const BIG_BLIND_AMOUNT = 2;

export const HAND_ROYAL_FLUSH = 'HAND_ROYAL_FLUSH';
export const HAND_STRAIGHT_FLUSH = 'HAND_STRAIGHT_FLUSH';
export const HAND_FOUR_OF_A_KIND = 'HAND_FOUR_OF_A_KIND';
export const HAND_FULL_HOUSE = 'HAND_FULL_HOUSE';
export const HAND_FLUSH = 'HAND_FLUSH';
export const HAND_STRAIGHT = 'HAND_STRAIGHT';
export const HAND_THREE_OF_A_KIND = 'HAND_THREE_OF_A_KIND';
export const HAND_TWO_PAIR = 'HAND_TWO_PAIR';
export const HAND_ONE_PAIR = 'HAND_ONE_PAIR';
export const HAND_HIGH_CARD = 'HAND_HIGH_CARD';

export const HANDS_RANKED = [
  HAND_ROYAL_FLUSH,
  HAND_STRAIGHT_FLUSH,
  HAND_FOUR_OF_A_KIND,
  HAND_FULL_HOUSE,
  HAND_FLUSH,
  HAND_STRAIGHT,
  HAND_THREE_OF_A_KIND,
  HAND_TWO_PAIR,
  HAND_ONE_PAIR,
  HAND_HIGH_CARD
];

export const HAND_RANK_LOOKUP = toLookup(HANDS_RANKED, echo, (hand, index) => index);

export const HAND_NAMES = {
  [HAND_ROYAL_FLUSH]: 'Royal Flush',
  [HAND_STRAIGHT_FLUSH]: 'Straight Flush',
  [HAND_FOUR_OF_A_KIND]: 'Four of a Kind',
  [HAND_FULL_HOUSE]: 'Full House',
  [HAND_FLUSH]: 'Flush',
  [HAND_STRAIGHT]: 'Straight',
  [HAND_THREE_OF_A_KIND]: 'Three of a Kind',
  [HAND_TWO_PAIR]: 'Two Pair',
  [HAND_ONE_PAIR]: 'One Pair',
  [HAND_HIGH_CARD]: 'High Card'
};

export const HANDS_WITH_SPECIAL_SORT = {
  [HAND_TWO_PAIR]: true,
  [HAND_FULL_HOUSE]: true
}