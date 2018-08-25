import React from 'react';
import CardStack from './CardStack';
import Chips from './Chips';
import * as images from '../images';

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
  const playerClass = `player-${playerIndex}`;
  const Avatar = images[`Avatar${playerIndex}`];
  return (
    <div className={`player-container ${playerClass}`}>
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
        <Chips className={`player-chips ${playerClass}`}
               amount={playerBank} />
        <Chips className={`player-bet ${playerClass}`}
               amount={playerBet} />
        {
          <CardStack cards={playerHand ? playerHand.cardsInRank.concat(playerHand.kickers) : holeCards}
                     className={`${playerClass}`} />
        }
        <Avatar className={`avatar ${playerClass} ${isInTurn ? 'in-turn' : ''} ${playerFolded ? 'folded' : ''}`} />
      </div>
    </div>
  );
};

export default PlayerDisplay;
