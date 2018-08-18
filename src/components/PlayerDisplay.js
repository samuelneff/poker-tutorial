import React from 'react';
import CardStack from './CardStack';

const PlayerDisplay = (
  {
    isDealer,
    isInTurn,
    lastRaisePlayerIndex,
    player
  }) => {
  const {
    holeCards,
    playerBet,
    playerBank,
    playerBusted,
    playerFolded,
    playerHand,
    playerIndex,
    playerName,
    playerWinner
  } = player;
  return (
    <div>
      <div>
        Player { playerName } ({ playerIndex })
        {
          isDealer ? ' - DEALER' : ''
        }
        {
          isInTurn ? ' - IN TURN' : ''
        }
        {
          (lastRaisePlayerIndex === playerIndex) ? ' - LAST RAISE' : ''
        }
        {
          playerFolded ? ' - FOLDED' : ''
        }
        {
          playerBusted ? ' - BUSTED' : ''
        }
        {
          playerWinner ? ' - WINNER' : ''
        }
      </div>
      <div className="interim-data">
        <div><CardStack cards={holeCards} /></div>
        <div>Bankroll: {playerBank}</div>
        <div>Bet: {playerBet}</div>
        {
          playerHand &&
          <div>
            { playerHand.handName }
            { ' - ' }
            <CardStack cards={playerHand.cardsInRank} />
            { ' / ' }
            <CardStack cards={playerHand.kickers} />
          </div>
        }
      </div>
    </div>
  );
};

export default PlayerDisplay;
