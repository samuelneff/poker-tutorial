import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlayerDisplay from './PlayerDisplay';

class PlayersDisplay extends Component {
  render() {
    
    const { 
      dealerPlayerIndex,
      inTurnPlayerIndex,
      players
    } = this.props;    

    return players.map(player => (
      <PlayerDisplay key={player.playerName}
                     player={player}
                     isDealer={player.playerIndex === dealerPlayerIndex} 
                     isInTurn={player.playerIndex === inTurnPlayerIndex} /> 
    ));
  }
}

const mapStateToProps = state => {
  const { 
    dealerPlayerIndex,
    inTurnPlayerIndex,
    players
  } = state;
  return {
    dealerPlayerIndex,
    inTurnPlayerIndex,
    players
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayersDisplay);
