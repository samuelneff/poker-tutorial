import cardKey from '../cardKey';

export default function cardsToText(cards) {
  return Array.isArray(cards)
    ? cards.map(cardKey).join(', ')
    : '<empty-cards>';
}
