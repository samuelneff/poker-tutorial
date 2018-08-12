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
      <h1>
        Player { playerName } ({ playerIndex })
        {
          isDealer ? ' - DEALER' : ''
        }
        {
          isInTurn ? ' - IN TURN': ''
        }
      </h1>
      <div className="interim-data">
        <div>Bankroll: {playerBank}</div>
        <div><CardStack cards={holeCards} /></div>
        <div>Bet: {playerBet}</div>
      </div>
    </div>
  );
}
