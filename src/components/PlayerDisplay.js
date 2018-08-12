import React from 'react'
import CardStack from './CardStack';
import ChipStacks from './ChipStacks';

export default ( { isDealer, isInTurn, player }) => {
  const {
    holeCards,
    playerChips,
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
        <div><CardStack cards={holeCards} /></div>
        <div><ChipStacks chips={playerChips} /></div>
      </div>
    </div>
  );
}
