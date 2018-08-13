import bestHandAvailable from './bestHandAvailable';
import {
  HAND_ROYAL_FLUSH,
  HAND_STRAIGHT_FLUSH,
  HAND_FOUR_OF_A_KIND,
  HAND_FULL_HOUSE,
  HAND_FLUSH,
  HAND_STRAIGHT,
  HAND_THREE_OF_A_KIND,
  HAND_TWO_PAIR,
  HAND_ONE_PAIR,
  HAND_HIGH_CARD,
  HAND_NAMES
} from './constants';
import cardArrayFromTextList from './test/cardArrayFromTextList';
import cardFromText from './test/cardFromText';
import handFromText from './test/handFromText';

describe('utils', () =>
  describe('bestHandAvailable', () => {
    function testBestHandAvailable(
      allCardsText,
      expectedHandRef,
      expectedCardsInRankText,
      expectedHighCardText
    ) {
      it(`${allCardsText} - ${HAND_NAMES[expectedHandRef]}`, () => {
        const allCards = cardArrayFromTextList(allCardsText);
        const expected = handFromText(
          '',
          expectedHandRef,
          expectedCardsInRankText,
          '',
          expectedHighCardText
        );

        debugger;

        const actual = bestHandAvailable(allCards);
        // cards in hand and kickers are not necessarily predictable, and other than high card don't matter
        // so always blank out
        actual.cardsInHand = [];
        actual.kickers = [];
        expect(actual).toEqual(expected);
      });
    }

    // testBestHandAvailable(
    //   '5H, QS, 0D, 2D, 4S, 9D, 3S',
    //   HAND_HIGH_CARD,
    //   'QS',
    //   ''
    // );

    // testBestHandAvailable(
    //   'QD, 0H, 0D, 2D, 4S, 9D, 3S',
    //   HAND_ONE_PAIR,
    //   '0D, 0H',
    //   'QD'
    // );

    // testBestHandAvailable(
    //   '6D, 0H, 0D, 2D, 4S, 9D, 3S',
    //   HAND_ONE_PAIR,
    //   '0D, 0H',
    //   '9D'
    // );

    // testBestHandAvailable(
    //   '3D, 0H, 0D, 2D, 4S, 9D, 3S',
    //   HAND_TWO_PAIR,
    //   '0D, 0H, 3D, 3S',
    //   '9D'
    // );

    // testBestHandAvailable(
    //   '6D, 0H, 0D, 2D, 4S, 9D, 0S',
    //   HAND_THREE_OF_A_KIND,
    //   '0D, 0H, 0S',
    //   '9D'
    // );

    // testBestHandAvailable(
    //   '6D, 0H, 0D, 2D, 4S, 9D, 3S',
    //   HAND_ONE_PAIR,
    //   '0D, 0H',
    //   '9D'
    // );

    // testBestHandAvailable(
    //   '6D, 0H, 5D, 2D, 4S, 9D, 3S',
    //   HAND_STRAIGHT,
    //   '2D, 3S, 4S, 5D, 6D',
    //   ''
    // );

    // testBestHandAvailable(
    //   '6D, KD, 0D, 2D, 4S, 9H, 3D',
    //   HAND_FLUSH,
    //   '2D, 3D, 6D, 0D, KD',
    //   ''
    // );

    // testBestHandAvailable(
    //   '6D, 0H, 0D, 2D, 2S, 2H, 3S',
    //   HAND_FULL_HOUSE,
    //   '2D, 2H, 2S, 0D, 0H',
    //   ''
    // );

    // testBestHandAvailable(
    //   '6D, 0H, 0D, 2D, 0C, 9D, 0S',
    //   HAND_FOUR_OF_A_KIND,
    //   '0C, 0D, 0H, 0S',
    //   '9D'
    // );

    // testBestHandAvailable(
    //   '6D, 5D, 0D, 2D, 4D, 9D, 3D',
    //   HAND_STRAIGHT_FLUSH,
    //   '2D, 3D, 4D, 5D, 6D',
    //   ''
    // );

    // testBestHandAvailable(
    //   '0D, KD, JD, 8D, QD, AD, 9D',
    //   HAND_ROYAL_FLUSH,
    //   '0D, JD, QD, KD, AD',
    //   ''
    // );

    testBestHandAvailable(
      '2H, 8C, JC, AH, 5D, 0H, 5H',
      HAND_ONE_PAIR,
      '5D, 5H',
      ''
    );

  }));
