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
import handSorter from './handSorter';
import handFromText from './test/handFromText';

describe('utils', () => describe('evaluateHand', () => {

  function testHandSorter(
    firstCardsInHandText,
    firstHandRef,
    firstCardsInRankText,
    firstKickersText,
    firstHighCardText,
    secondCardsInHandText,
    secondHandRef,
    secondCardsInRankText,
    secondKickersText,
    secondHighCardText,
    expected) {

    const firstHand = handFromText(
      firstCardsInHandText,
      firstHandRef,
      firstCardsInRankText,
      firstKickersText,
      firstHighCardText);

    const secondHand = handFromText(
      secondCardsInHandText,
      secondHandRef,
      secondCardsInRankText,
      secondKickersText,
      secondHighCardText);

    const actual = Math.sign(handSorter(firstHand, secondHand));

    const testName = firstHandRef === secondHandRef
      ? `Both ${firstHand.handName} - `
        + `${firstCardsInRankText} (${firstHighCardText})`
        + ' vs '
        + `${secondCardsInRankText} (${secondHighCardText})`
      : `${firstHand.handName} vs ${secondHand.handName}`;

    // not using expect since we want a detailed error
    it(
      testName,
      () => {
        if (actual === expected) {
          return;
        }
        const expectedHand = expected === 0
          ? 'equal'
          : expected === -1
            ? 'be less than'
            : 'be greater than';

        throw new Error(`\nHand comparison espected first to ${expectedHand} the second.
          First
          -----
          \n${JSON.stringify(firstHand, undefined, 2)}
          
          Second
          ------
          \n${JSON.stringify(secondHand, undefined, 2)}
          
          expected !== actual
            ${expected}  !==  ${actual}
        `);
      }
    );
  }

  testHandSorter(

    'JC JD JS JH 4D',
    HAND_FOUR_OF_A_KIND,
    'JC JD JS JH',
    '4D',
    '4D',

    '4D 5D 6D 7D 4S',
    HAND_ONE_PAIR,
    '4D 4S',
    '5D 6D 7D',
    '7D',

    -1);

  testHandSorter(

    'JC JD JS JH 4D',
    HAND_FOUR_OF_A_KIND,
    'JC JD JS JH',
    '4D',
    '4D',

    '3C 3D 3S 3H 4D',
    HAND_FOUR_OF_A_KIND,
    '3C 3D 3S 3H',
    '4D',
    '4D',

    -1);

  testHandSorter(

    'JC JD JS JH 4D',
    HAND_FOUR_OF_A_KIND,
    'JC JD JS JH',
    '4D',
    '4D',

    '3H 4H 5H 6H 7D',
    HAND_STRAIGHT,
    '3H 4H 5H 6H 7D',
    '',
    '',

    -1);

  testHandSorter(

    '5D 6D 7C 8C 9S',
    HAND_STRAIGHT,
    '5D 6D 7C 8C 9S',
    '',
    '',

    '3H 4H 5H 6H 7D',
    HAND_STRAIGHT,
    '3H 4H 5H 6H 7D',
    '',
    '',

    -1);

  testHandSorter(

    'JC JD JS JH 4D',
    HAND_FOUR_OF_A_KIND,
    'JC JD JS JH',
    '4D',
    '4D',

    '3H 4H 5H 6H 7H',
    HAND_STRAIGHT_FLUSH,
    '3H 4H 5H 6H 7H',
    '',
    '',

    1);

  testHandSorter(

    '3H 4H 5H 6H 7H',
    HAND_STRAIGHT_FLUSH,
    '3H 4H 5H 6H 7H',
    '',
    '',

    '8H 9H 0H JH QH',
    HAND_STRAIGHT_FLUSH,
    '8H 9H 0H JH QH',
    '',
    '',

    1);

  testHandSorter(

    'JC JD JS JH 4D',
    HAND_FOUR_OF_A_KIND,
    'JC JD JS JH',
    '4D',
    '4D',

    '0C JC QC KC AC',
    HAND_ROYAL_FLUSH,
    '0C JC QC KC AC',
    '',
    '',

    1);

  testHandSorter(

    '0C JC QC KC AC',
    HAND_ROYAL_FLUSH,
    '0C JC QC KC AC',
    '',
    '',

    '3H 4H 5H 6H 7H',
    HAND_STRAIGHT_FLUSH,
    '3H 4H 5H 6H 7H',
    '',
    '',

    -1);

  testHandSorter(

    '0C JC QC KC AC',
    HAND_ROYAL_FLUSH,
    '0C JC QC KC AC',
    '',
    '',

    '0H JH QH KH AH',
    HAND_ROYAL_FLUSH,
    '0H JH QH KH AH',
    '',
    '',

    0);

  testHandSorter(

    'JC JD AC 3D 4D',
    HAND_ONE_PAIR,
    'JC JD',
    '3D 4D AC',
    'AC',

    '4D 5D 5C 7D 4S',
    HAND_TWO_PAIR,
    '5C 5D 4D 4S',
    '7D',
    '7D',

    1);

  testHandSorter(

    'JC JD AC 3D 4D',
    HAND_ONE_PAIR,
    'JC JD',
    '3D 4D AC',
    'AC',

    '4D 5D 6D 7D 4S',
    HAND_ONE_PAIR,
    '4D 4S',
    '5D 6D 7D',
    '7D',

    -1);

  testHandSorter(

    'JC JD AC 3D 4D',
    HAND_ONE_PAIR,
    'JC JD',
    '3D 4D AC',
    'AC',

    'KD 5D 6D KC 4S',
    HAND_ONE_PAIR,
    'KC KD',
    '4S 5D 6D',
    '6D',

    1);

  testHandSorter(

    'KD 5D 6D KC 4S',
    HAND_ONE_PAIR,
    'KC KD',
    '4S 5D 6D',
    '6D',

    'JC JD AC 3D 4D',
    HAND_ONE_PAIR,
    'JC JD',
    '3D 4D AC',
    'AC',

    -1);

  testHandSorter(

    'JC JD AC 3D 4D',
    HAND_ONE_PAIR,
    'JC JD',
    '3D 4D AC',
    'AC',

    'JC JD QC 3D 4D',
    HAND_ONE_PAIR,
    'JC JD',
    '3D 4D QC',
    'QC',

    -1);

  testHandSorter(

    'JC JD QC 3D 4D',
    HAND_ONE_PAIR,
    'JC JD',
    '3D 4D QC',
    'QC',

    'JC JD AC 3D 4D',
    HAND_ONE_PAIR,
    'JC JD',
    '3D 4D AC',
    'AC',

    1);

  testHandSorter(

    'JC JD QC 3D 4D',
    HAND_ONE_PAIR,
    'JC JD',
    '3D 4D QC',
    'QC',

    'JC JD QC 3D 4D',
    HAND_ONE_PAIR,
    'JC JD',
    '3D 4D QC',
    'QC',

    0);

}));
