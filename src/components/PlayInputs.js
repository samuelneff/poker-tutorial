import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import newDeck from '../utils/newDeck';
import * as actions from '../redux/actions';
import { 
  CHIP_ONE, 
  CHIP_FIVE,
  CHIP_TEN, 
  CHIP_TWENTY,
  CHIP_HUNDRED,
  PLAY_LAG_MILLISECONDS
} from '../utils/constants';
import timeout from '../utils/timeout';

export class PlayInputs extends Component {

  startNewGame = () => {
    const {
      actions: {
        communityCardsUpdate,
        dealerPlayerIndexUpdate,
        deckUpdate,
        inTurnPlayerIndexUpdate,
        playerAdd,
        playersClear,
        potUpdate
      }
    } = this.props;
    
    // everyone starts with $1,000
    const defaultChips = {
      [CHIP_ONE]: 10,
      [CHIP_FIVE]: 10,
      [CHIP_TEN]: 10,
      [CHIP_TWENTY]: 12,
      [CHIP_HUNDRED]: 6
    };

    communityCardsUpdate([]);
    dealerPlayerIndexUpdate(0);
    deckUpdate(newDeck());
    inTurnPlayerIndexUpdate(0);
    playersClear();
    ["Sam", "Charlotte", "Caitlin", "Cole", "Caden", "Claire"].forEach(
      (playerName, playerIndex) =>
        playerAdd(
          {
            playerIndex,
            playerName,            
            playerChips: { ...defaultChips },
            playerBet: {},
            holeCards: []
          })
    );
    potUpdate({ ...defaultChips });
  }

  startNewDeal = async () => {
    const {
      actions: {
        betsClear
      }
    } = this.props;
    betsClear();
    await timeout(PLAY_LAG_MILLISECONDS);
    
  }

  render() {
    return (
      <div className="player-input">
        <h1>PlayInputs</h1>
        <button onClick={this.startNewGame}>New Game</button>
        <button onClick={this.startNewDeal}>New Deail</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
  
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayInputs)

