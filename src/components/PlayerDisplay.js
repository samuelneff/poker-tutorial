import React from 'react'
import CardStack from './CardStack';

export default ( { isDealer, isInTurn, player }) => {
  const {
    holeCards,
    playerBet,
    playerBank,
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
          isInTurn ? ' - IN TURN': ''
        }
      </div>
      <div className="interim-data">
        <div><CardStack cards={holeCards} /></div>
        <div>Bankroll: {playerBank}</div>
        <div>Bet: {playerBet}</div>
      </div>
    </div>
  );
}
