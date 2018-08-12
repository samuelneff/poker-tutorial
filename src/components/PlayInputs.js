import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import newDeck from '../utils/newDeck';
import * as actions from '../redux/actions';
import { 
  BIG_BLIND_AMOUNT,
  PLAY_LAG_MILLISECONDS,
  SMALL_BLIND_AMOUNT
} from '../utils/constants';
import nextPlayerIndex from '../utils/nextPlayerIndex';
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
    
    communityCardsUpdate([]);
    dealerPlayerIndexUpdate(null);
    deckUpdate(newDeck());
    inTurnPlayerIndexUpdate(0);
    playersClear();
    ["Sam", "Charlotte", "Caitlin", "Cole", "Caden", "Claire"].forEach(
      (playerName, playerIndex) =>
        playerAdd(
          {
            playerIndex,
            playerName,            
            playerBank: 1000,
            playerBet: 0,
            holeCards: [],
            playerBusted: false
          })
    );
    potUpdate(0);
  }

  startNewDeal = async () => {
    const {
      actions: {
        betsClear,
        communityCardsUpdate,
        dealerPlayerIndexUpdate,
        deckUpdate,
        inTurnPlayerIndexUpdate,
        playerAdd,
        playersClear,
        potUpdate
      },
      dealerPlayerIndex,
      inTurnPlayerIndex,
      players
    } = this.props;

    const newDealerIndex = nextPlayerIndex(dealerPlayerIndex, players);
    communityCardsUpdate([]);
    betsClear();
    dealerPlayerIndexUpdate(newDealerIndex);
    inTurnPlayerIndexUpdate(newDealerIndex);
    await timeout(PLAY_LAG_MILLISECONDS);
    await this.runBlind(SMALL_BLIND_AMOUNT);
    await timeout(PLAY_LAG_MILLISECONDS);
    await this.runBlind(BIG_BLIND_AMOUNT);
    await timeout(PLAY_LAG_MILLISECONDS);
    this.startThisDeal();
  }

  runBlind = async blindAmount => {
    const {
      actions: {
        betAdd,
        inTurnPlayerIndexUpdate
      },
      bustPlayer,
      inTurnPlayerIndex,
      players
    } = this.props;
    const blindIndex = nextPlayerIndex(inTurnPlayerIndex, players);
    const blindPlayer = players[blindIndex];
    
    inTurnPlayerIndexUpdate(blindIndex);

    if (blindPlayer.playerBank < blindAmount) {
      bustPlayer(blindPlayer);
      await timeout(PLAY_LAG_MILLISECONDS);
      await this.runBlind(blindAmount);
      return;
    }

    betAdd(blindPlayer, blindAmount);
  }

  startThisDeal = async () => {
    const {
      actions: {
        inTurnPlayerIndexUpdate
      },
      inTurnPlayerIndex,
      players
    } = this.props;
    const nextIndex = nextPlayerIndex(inTurnPlayerIndex, players);
    inTurnPlayerIndexUpdate(nextIndex);
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
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayInputs)

