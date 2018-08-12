
interface Player {
  playerIndex:number;
  playerName:string;
  playerBank:number;
  playerBet:number;
  holeCards:Card[];
  playerHand:Hand;
  playerFolded:boolean;
  playerBusted:boolean;
}