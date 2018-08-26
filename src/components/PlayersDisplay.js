import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlayerDisplay from './PlayerDisplay';

class PlayersDisplay extends Component {
  render() {
    
    const { 
      dealerPlayerIndex,
      inTurnPlayerIndex,
      lastRaisePlayerIndex,
      players
    } = this.props;    

    return players.map(player => (
      <PlayerDisplay key={player.playerIndex}
                     player={player}
                     isDealer={player.playerIndex === dealerPlayerIndex} 
                     isInTurn={player.playerIndex === inTurnPlayerIndex}
                     lastRaisePlayerIndex={lastRaisePlayerIndex} />
    ));
  }
}

const mapStateToProps = state => {
  const { 
    dealerPlayerIndex,
    inTurnPlayerIndex,
    lastRaisePlayerIndex,
    players
  } = state;
  return {
    dealerPlayerIndex,
    inTurnPlayerIndex,
    lastRaisePlayerIndex,
    players
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayersDisplay);
