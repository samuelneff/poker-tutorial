import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import * as actions from '../redux/actions';

class ChoosePlayers extends Component {

  constructor(props) {
    super(props);
    this.state = {
      players: []
    };
    this.addPlayer = this.addPlayer.bind(this);
    this.updatePlayerName = this.updatePlayerName.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  addPlayer() {
    const { players } = this.state;
    const newPlayers = [
      ...players,
      {
        playerIndex: players.length,
        playerName: '',
        playerBank: 1000
      }
    ];
    this.setState( { players: newPlayers });
  }

  updatePlayerName(event, player) {
    const { players } = this.state;
    const newPlayer = {
      ...player,
      playerName: event.target.value
    }      ;
    const newPlayers = players.slice();
    newPlayers[newPlayer.playerIndex] = newPlayer;
    this.setState( { players: newPlayers } );
  }

  startGame() {
    const {
      actions: {
        gameStart,
        playerAdd
      },
      history
    } = this.props;
    const { players } = this.state;

    players.forEach(playerAdd);
    gameStart();
    history.push('/game');
  }

  render() {
    const { players } = this.state;

    return (
      <div>
        <h1>Choose and name players</h1>
        {
          players.map(player => (
            <div key={player.playerIndex}>
              Player {player.playerIndex + 1}:
              <input type="text"
                     value={player.playerName}
                     onChange={event => this.updatePlayerName(event, player)} />
            </div>
          ))
        }
        <button type="button"
                onClick={this.addPlayer}>
          Add Player
        </button>
        <button type="button"
                onClick={this.startGame}>
          Start game
        </button>
      </div>
    );
  }
}







function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChoosePlayers));
