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
import evaluateHand from './evaluateHand';
import cardArrayFromTextList from './test/cardArrayFromTextList';
import handFromText from './test/handFromText';

describe('utils', () => describe('evaluateHand', () => {

  function testEvaluateHand(
    cardsInHandText,
    expectedHandRef,
    expectedCardsInRankText,
    expectedKickersText,
    expectedHighCardText) {

    it(`${cardsInHandText} - ${HAND_NAMES[expectedHandRef]}`, () => {

      const cardsInHand = cardArrayFromTextList(cardsInHandText);
      if (cardsInHand.length !== 5) {
        throw new Error(`Invalid cardInHand test text, expected 5 cards, got ${cardsInHand.length}: ${cardsInHandText}`);
      }

      const actual = evaluateHand(cardsInHand);
      const expected = handFromText(
        cardsInHandText,
        expectedHandRef,
        expectedCardsInRankText,
        expectedKickersText,
        expectedHighCardText
      );
      expect(actual).toEqual(expected);
    });
  }

  testEvaluateHand(
    'KC, 4S, 5C, 0C, 9S',
    HAND_HIGH_CARD,
    'KC',
    '4S, 5C, 9S, 0C',
    '');

  testEvaluateHand(
    'KC, 5D, 5S, QC, AH',
    HAND_ONE_PAIR,
    '5D, 5S',
    'QC, KC, AH',
    'AH');

  testEvaluateHand(
    '3C, 5D, 5S, QC, AH',
    HAND_ONE_PAIR,
    '5D, 5S',
    '3C, QC, AH',
    'AH');
  
  testEvaluateHand(
    '3C, 5D, 4S, 3D, 2H',
    HAND_ONE_PAIR,
    '3C, 3D',
    '2H, 4S, 5D',
    '5D');
  
  testEvaluateHand(
    '3C, 5D, 5S, 3D, 2H',
    HAND_TWO_PAIR,
    '5D, 5S, 3C, 3D',
    '2H',
    '2H');
  
  testEvaluateHand(
    '3C, 5D, 3S, 3D, 2H',
    HAND_THREE_OF_A_KIND,
    '3C, 3D, 3S',
    '2H, 5D',
    '5D');
    
  testEvaluateHand(
    '4D, 7H, 5C, 6S, 8D',
    HAND_STRAIGHT,
    '4D, 5C, 6S, 7H, 8D',
    '',
    '');

  testEvaluateHand(
    '4D, 7D, 5D, 6D, 0D',
    HAND_FLUSH,
    '4D, 5D, 6D, 7D, 0D',
    '',
    '');
          
  testEvaluateHand(
    '4D, 7D, 4C, 4H, 7H',
    HAND_FULL_HOUSE,
    '4C, 4D, 4H, 7D, 7H',
    '',
    '');
          
  testEvaluateHand(
    '4D, 4S, 4C, 4H, 7H',
    HAND_FOUR_OF_A_KIND,
    '4C, 4D, 4H, 4S',
    '7H',
    '7H');
              
  testEvaluateHand(
    '4D, 7D, 5D, 6D, 8D',
    HAND_STRAIGHT_FLUSH,
    '4D, 5D, 6D, 7D, 8D',
    '',
    '');

  testEvaluateHand(
    'JD, QD, 0D, AD, KD',
    HAND_ROYAL_FLUSH,
    '0D, JD, QD, KD, AD',
    '',
    '');

    }));