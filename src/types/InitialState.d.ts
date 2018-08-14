interface InitialState {
  currentBet: number;
  communityCards: Card[];
  dealerPlayerIndex: number;
  deck: Card[];
  inTurnPlayerIndex: number;
  players:Player[];
  pot: number;
}
