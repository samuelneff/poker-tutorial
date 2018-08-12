interface Hand {
  handRef:string;
  handName:string;
  handRank:number;
  highCard:Card;
  cardsInHand:Card[];
  cardsInRank:Card[];
  kickers:Card[];
}