import React, { Component } from "react";
import { connect } from "react-redux";
import PlayerDisplay from './PlayerDisplay';

export class PlayersDisplay extends Component {
  render() {
    
    const { players } = this.props;    

    return players.map(player => (
      <PlayerDisplay key={player.playerName}
                     player={player} /> 
    ));
  }
}

const mapStateToProps = state => {
  const { players } = state;
  return {
    players
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayersDisplay);
