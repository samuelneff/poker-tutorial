
interface Player {
  playerIndex:number;
  playerName:string;
  playerBank:number;
  playerBet:number;
  holeCards:Card[];
  playerFolded:boolean;
  playerBusted:boolean;
}