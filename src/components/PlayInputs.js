// methods are ordered logically by when they are used, so don't alphabetize
/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../redux/actions';
import asyncForEach from '../utils/asyncForEach';
import asyncRunWithDelayBetween from '../utils/asyncRunWithDelayBetween';
import bestHandAvailable from '../utils/bestHandAvailable';
import { 
  BIG_BLIND_AMOUNT,
  // GAME_NOT_STARTED,
  // GAME_READY_TO_DEAL,
  // GAME_CAN_CALL,
  // GAME_CAN_RAISE,
  // GAME_CAN_FOLD,
  // GAME_READY_FOR_CARD,
  // GAME_READY_TO_EVALUATE,
  PLAY_LAG_MILLISECONDS,
  SMALL_BLIND_AMOUNT
} from '../utils/constants';
import filterAvailablePlayers from '../utils/filterAvailablePlayers';
import findWinners from '../utils/findWinners';
import newDeck from '../utils/newDeck';
import nextPlayerIndex from '../utils/nextPlayerIndex';
import timeout from '../utils/timeout';

class PlayInputs extends Component {

  constructor() {
    super();
    this.state = {
      raiseAmount: BIG_BLIND_AMOUNT
    };
  }

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
    ['Sam', 'Charlotte', 'Caitlin', 'Cole', 'Caden', 'Claire'].forEach(
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
  };

  startNewDeal = async () => {

    await asyncRunWithDelayBetween(
      PLAY_LAG_MILLISECONDS,
      this.clearDeal,
      this.rotateDealer,
      this.dealCards,
      async () => this.runBlind(SMALL_BLIND_AMOUNT),
      async () => this.runBlind(BIG_BLIND_AMOUNT),
      this.goToNextPlayer);
  };

  clearDeal = async () => {
    const {
      actions: {
        betsClear,
        communityCardsUpdate,
        deckUpdate,
      }
    } = this.props;
    betsClear();
    communityCardsUpdate([]);
    deckUpdate(newDeck());
  };

  rotateDealer = async () => {
    const {
      actions: {
        dealerPlayerIndexUpdate,
        inTurnPlayerIndexUpdate,
      },
      dealerPlayerIndex,
      players
    } = this.props;
    const newDealerIndex = nextPlayerIndex(dealerPlayerIndex, players);
    dealerPlayerIndexUpdate(newDealerIndex);
    inTurnPlayerIndexUpdate(newDealerIndex);
  };

  dealCards = async () => {
    const {
      actions: {
        cardDealToCommunity,
        cardDealToPlayer
      },
      dealerPlayerIndex,
      players
    } = this.props;
    const availablePlayers = filterAvailablePlayers(players);
    const playersLeftOfDealer = availablePlayers.filter(player => player.playerIndex > dealerPlayerIndex);
    const playersRightOfDealer = availablePlayers.filter(player => player.playerIndex <= dealerPlayerIndex);
    const dealOrderPlayers = [].concat(
      playersLeftOfDealer,
      playersRightOfDealer,
      playersLeftOfDealer,
      playersRightOfDealer
    );

    await asyncForEach(
      dealOrderPlayers,
      async player => {
        // cannot destructure outside lambda since we're in async
        const { deck } = this.props;
        cardDealToPlayer(player, deck[0]);
        await timeout(PLAY_LAG_MILLISECONDS);
      }
    );

    await timeout(PLAY_LAG_MILLISECONDS);
    // Don't use destructuring because it will be cached when the function is split up due to async/await
    // and that's not what we want
    // eslint-disable-next-line react/destructuring-assignment
    cardDealToCommunity(this.props.deck[0]);

    await timeout(PLAY_LAG_MILLISECONDS);
    // ditto on not using destructuring
    // eslint-disable-next-line react/destructuring-assignment
    cardDealToCommunity(this.props.deck[0]);

  };

  runBlind = async blindAmount => {
    const {
      actions: {
        betRaise,
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

    betRaise(blindPlayer, blindAmount);
  };

  betCall = () => {
    const {
      actions: {
        betCall
      },
      currentBet,
      inTurnPlayerIndex,
      players
    } = this.props;

    const player = players[inTurnPlayerIndex];

    betCall(
      player,
      currentBet - player.playerBet);

    this.goToNextPlayer();
  };

  betCheck = () => {
    const {
      actions: {
        betCheck
      },
      inTurnPlayerIndex,
      players
    } = this.props;
    betCheck(players[inTurnPlayerIndex]);
    this.goToNextPlayer();
  };

  betFold = () => {
    const {
      actions: {
        betFold
      },
      inTurnPlayerIndex,
      players
    } = this.props;
    betFold(players[inTurnPlayerIndex]);
    this.goToNextPlayer();
  };

  betRaise = () => {
    const {
      actions: {
        betRaise
      },
      currentBet,
      inTurnPlayerIndex,
      players
    } = this.props;
    const {
      raiseAmount
    } = this.state;

    const player = players[inTurnPlayerIndex];

    betRaise(
      player,
      raiseAmount,
      currentBet + raiseAmount - player.playerBet);

    this.goToNextPlayer();
  };

  goToNextPlayer = () => {
    const {
      actions: {
        inTurnPlayerIndexUpdate
      },
      inTurnPlayerIndex,
      players
    } = this.props;
    inTurnPlayerIndexUpdate(nextPlayerIndex(inTurnPlayerIndex, players));
  };

  setRaiseAmount = raiseAmount => {
    this.setState({ raiseAmount });
  };

  dealNextCommunityCard = () => {
    const {
      actions: {
        cardDealToCommunity
      },
      deck
    } = this.props;
    cardDealToCommunity(deck[0]);
  };

  evaluateHands = async () => {
    const {
      actions: {
        playerHandUpdate
      },
      communityCards,
      players
    } = this.props;

    await asyncForEach(
      players,
      async player => {
        const playerHand = bestHandAvailable(communityCards.concat(player.holeCards));
        playerHandUpdate({...player, playerHand});
      }
    );

    await this.evaluateWinners();
  };

  evaluateWinners = async () => {
    const {
      actions: {
        playerWinnerUpdate
      },
      players
    } = this.props;
    const winners = findWinners(players);
    if (winners.length === 0) {
      // eslint-disable-next-line no-console
      console.error('No winners ?!?');
    }
    winners.forEach(playerWinnerUpdate);
  };

  // getGameState = () => {
  //   const {
  //     communityCards,
  //     currentBet,
  //     dealerPlayerIndex,
  //     deck,
  //     inTurnPlayerIndex,
  //     players
  //   } = this.props;
  //
  //   if (players.length === 0) {
  //     return GAME_NOT_STARTED;
  //   }
  //
  //   if (players[0].holeCards.length === 0) {
  //     return GAME_READY_TO_DEAL;
  //   }
  //
  //
  // };

  render() {
    const {
      currentBet
    } = this.props;
    const {
      raiseAmount
    } = this.state;
    return (
      <div className="player-input">
        <div>
          PlayInputs
        </div>
        <div className="interim-data">
          <div>
            <button onClick={this.startNewGame}
                    type="button">
              New Game
            </button>
            <button onClick={this.startNewDeal}
                    type="button">
              New Deal
            </button>
          </div>
          <div>
            <span>
              Bet:
              { ' ' }
              {currentBet}
              { ' ' }
            </span>
            <button onClick={this.betCheck}
                    type="button">
              Check
            </button>
            <button onClick={this.betCall}
                    type="button">
              Call
            </button>
            <input type="decimal"
                   onChange={event => this.setRaiseAmount(parseInt(event.target.value))}
                   onKeyPress={event => event.code === 'Enter' && this.betRaise()}
                   value={raiseAmount} />
            <button onClick={this.betRaise}
                    type="button">
              Raise
            </button>
            <button onClick={this.betFold}
                    type="button">
              Fold
            </button>
          </div>
          <div>
            <button onClick={this.dealNextCommunityCard}
                    type="button">
              Next Card
            </button>
          </div>
          <div>
            <button onClick={this.evaluateHands}
                    type="button">
              Evaluate
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {    
    communityCards,
    currentBet,
    dealerPlayerIndex,
    deck,
    inTurnPlayerIndex,
    players
  } = state;
  return {
    communityCards,
    currentBet,
    dealerPlayerIndex,
    deck,
    inTurnPlayerIndex,
    players
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayInputs);
