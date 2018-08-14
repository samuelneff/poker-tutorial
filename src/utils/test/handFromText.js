import byRankAndSuitSorter from '../byRankAndSuitSorter';
import cardArrayFromTextList from './cardArrayFromTextList';
import cardFromText from './cardFromText';
import {
  HAND_NAMES,
  HAND_RANK_LOOKUP,
} from '../constants';

export default function handFromText(
  cardsInHandText,
  handRef,
  cardsInRankText,
  kickersText,
  highCardText) {
  return {
    handRef,
    handName: HAND_NAMES[handRef],
    handRank: HAND_RANK_LOOKUP[handRef],
    highCard: cardFromText(highCardText),
    cardsInHand: cardArrayFromTextList(cardsInHandText).sort(byRankAndSuitSorter),
    cardsInRank: cardArrayFromTextList(cardsInRankText),
    kickers: cardArrayFromTextList(kickersText)
  };
}
