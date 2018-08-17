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
  CAN_START_GAME,
  CAN_START_HAND,
  CAN_DEAL_CARD,
  CAN_CHECK,
  CAN_CALL,
  CAN_RAISE,
  CAN_ALL_IN,
  CAN_FOLD,
  CAN_EVALUATE,
  GAME_STAGE_NOT_STARTED,
  GAME_STAGE_FIRST_BET,
  GAME_STAGE_FLOP,
  GAME_STAGE_SECOND_BET,
  GAME_STAGE_TURN,
  GAME_STAGE_THIRD_BET,
  GAME_STAGE_RIVER,
  GAME_STAGE_FINAL_BET,
  GAME_STAGE_EVALUATE,
  PLAY_LAG_MILLISECONDS,
  SMALL_BLIND_AMOUNT, GAME_STAGE_NEW_HAND
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
        gameStart,
        playerAdd,
        playersClear
      }
    } = this.props;

    gameStart();

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
  };

  startNewHand = async () => {
    const {
      actions: {
        gameStageUpdate
      }
    } = this.props;

    await asyncRunWithDelayBetween(
      PLAY_LAG_MILLISECONDS,
      this.clearDeal,
      this.rotateDealer,
      this.dealCards,
      async () => this.runBlind(SMALL_BLIND_AMOUNT),
      async () => this.runBlind(BIG_BLIND_AMOUNT),
      this.goToNextPlayer,
      () => gameStageUpdate(GAME_STAGE_FIRST_BET));
  };

  clearDeal = async () => {
    const {
      actions: {
        betsClear,
        deckUpdate,
      }
    } = this.props;
    deckUpdate(newDeck());
    betsClear();
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
        dealToPlayer
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
        dealToPlayer(player, deck[0]);
        await timeout(PLAY_LAG_MILLISECONDS);
      }
    );
  };

  runBlind = async blindAmount => {
    const {
      actions: {
        betBlind,
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

    betBlind(blindPlayer, blindAmount);
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

  betAllIn = () => {

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
        dealToCommunity
      },
      deck
    } = this.props;
    dealToCommunity(deck[0]);
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

  getAvailableActions = () => {
    const { gameStage } = this.props;

    switch (gameStage) {
      case GAME_STAGE_NOT_STARTED:
        return CAN_START_GAME;

      case GAME_STAGE_NEW_HAND:
        return CAN_START_HAND;

      case GAME_STAGE_FIRST_BET:
      case GAME_STAGE_SECOND_BET:
      case GAME_STAGE_THIRD_BET:
      case GAME_STAGE_FINAL_BET:
        return this.getAvailableBetActions();

      case GAME_STAGE_FLOP:
      case GAME_STAGE_TURN:
      case GAME_STAGE_RIVER:
        return CAN_DEAL_CARD;

      case GAME_STAGE_EVALUATE:
        return CAN_EVALUATE;

      default:
        console.error(`Unrecognized game stage '${gameStage}'.`);
        return 0;
    }
  };

  getAvailableBetActions = () => {
    const {
      currentBet,
      inTurnPlayerIndex,
      lastRaiseAmount,
      players
    } = this.props;

    // const allBetsDone = players.every(p => p.playerBusted || p.playerFolded || p.playerBet === currentBet) &&
    //   inTurnPlayerIndex === lastRaisePlayerIndex + 1;

    const player = players[inTurnPlayerIndex];
    const { playerBank, playerBet } = player;
    const callAmount = currentBet - playerBet;
    const minRaiseAmount = callAmount + (lastRaiseAmount * 2);

    let canDo = CAN_FOLD | CAN_ALL_IN;

    if (callAmount === 0) {
      canDo |= CAN_CHECK;
    } else if (playerBank >= callAmount) {
      canDo |= CAN_CALL;
    }

    if (playerBank >= minRaiseAmount) {
      canDo |= CAN_RAISE;
    }

    return canDo;
  };

  render() {
    const {
      currentBet,
      lastRaiseAmount
    } = this.props;
    const {
      raiseAmount
    } = this.state;
    const canDo = this.getAvailableActions();

    return (
      <div className="player-input">
        <div>
          PlayInputs
        </div>
        <div className="interim-data">
          <div>
            {`Current Bet: $${currentBet} Min. Raise: $${lastRaiseAmount}`}
          </div>
          <div>
            <button disabled={(canDo & CAN_START_GAME) === 0}
                    onClick={this.startNewGame}
                    type="button">
              New Game
            </button>
            <button disabled={(canDo & CAN_START_HAND) === 0}
                    onClick={this.startNewHand}
                    type="button">
              New Hand
            </button>
            <button disabled={(canDo & CAN_DEAL_CARD) === 0}
                    onClick={this.dealNextCommunityCard}
                    type="button">
              Next Card
            </button>
            <button disabled={(canDo & CAN_EVALUATE) === 0}
                    onClick={this.evaluateHands}
                    type="button">
              Evaluate
            </button>
          </div>
          <div>
            <button disabled={(canDo & CAN_CHECK) === 0}
                    onClick={this.betCheck}
                    type="button">
              Check
            </button>
            <button disabled={(canDo & CAN_CALL) === 0}
                    onClick={this.betCall}
                    type="button">
              Call
            </button>
            <input type="decimal"
                   onChange={event => this.setRaiseAmount(parseInt(event.target.value))}
                   onKeyPress={event => event.code === 'Enter' && this.betRaise()}
                   value={raiseAmount} />
            <button disabled={(canDo & CAN_RAISE) === 0}
                    onClick={this.betRaise}
                    type="button">
              Raise
            </button>
            <button disabled={(canDo & CAN_ALL_IN) === 0}
                    onClick={this.betAllIn}
                    type="button">
              All-In
            </button>
            <button disabled={(canDo & CAN_FOLD) === 0}
                    onClick={this.betFold}
                    type="button">
              Fold
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
    gameStage,
    inTurnPlayerIndex,
    lastRaiseAmount,
    lastRaisePlayerIndex,
    players
  } = state;
  return {
    communityCards,
    currentBet,
    dealerPlayerIndex,
    deck,
    gameStage,
    inTurnPlayerIndex,
    lastRaiseAmount,
    lastRaisePlayerIndex,
    players
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayInputs);
