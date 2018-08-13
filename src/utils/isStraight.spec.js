import isStraight from './isStraight';
import cardArrayFromTextList from './test/cardArrayFromTextList';

describe('utils', () => describe('isStraight', () => {

  function testStraight(inputText, expected) {
    it(`${inputText}`, () => {
      const inputCards = cardArrayFromTextList(inputText);
      const actual = isStraight(inputCards);
      expect(actual).toBe(expected);
    });
  }

  testStraight('2D, 3D, 4D, 5D, 6D', true);
  testStraight('5H, 7H, 8H, 9H, 0H', false);
  testStraight('5H, 7H, 8D, 6D, 9D', true);
  testStraight('0C, AD, KD, QS, JH', true);
  testStraight('0C, AD, KD, QS, AH', false);
}));