interface InitialState {
  currentBet: number;
  communityCards: Card[];
  dealerPlayerIndex: number;
  deck: Card[];
  gameStage: string;
  inTurnPlayerIndex: number;
  lastRaiseAmount: number;
  lastRaisePlayerIndex: number;
  players:Player[];
  pot: number;
}
