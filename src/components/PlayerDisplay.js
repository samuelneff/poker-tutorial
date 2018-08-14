import React from 'react';
import CardStack from './CardStack';

const PlayerDisplay = ({ isDealer, isInTurn, player }) => {
  const {
    holeCards,
    playerBet,
    playerBank,
    playerBusted,
    playerFolded,
    playerHand,
    playerIndex,
    playerName
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
          playerFolded ? ' - FOLDED' : ''
        }
        {
          playerBusted ? ' - BUSTED' : ''
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
