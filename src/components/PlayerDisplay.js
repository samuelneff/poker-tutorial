import React from 'react';
import CardStack from './CardStack';
import Chips from './Chips';

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
    <div className={`player-container player-${playerIndex}`}>
      <div className="player-inner-container">
        <div style={{ display: 'none'}}>
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
          <Chips className={`player-chips player-${playerIndex}`}
                 amount={playerBank} />
          <Chips className={`player-bet player-${playerIndex}`}
                 amount={playerBet} />
          {
            !playerHand &&
            <CardStack cards={holeCards}
                       className={`player-${playerIndex}`} />
          }
          {
            playerHand &&
            <CardStack cards={playerHand.cardsInRank.concat(playerHand.kickers)} />
          }
        </div>
      </div>
    </div>
  );
};

export default PlayerDisplay;
