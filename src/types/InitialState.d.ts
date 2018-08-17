interface InitialState {
  currentBet: number;
  communityCards: Card[];
  dealerPlayerIndex: number;
  deck: Card[];
  gameStageUpdate: string;
  inTurnPlayerIndex: number;
  lastRaiseAmount: number;
  lastRaisePlayerIndex: number;
  players:Player[];
  pot: number;
}
