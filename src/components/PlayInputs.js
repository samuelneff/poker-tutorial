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
  GAME_STAGES_LIST,
  GAME_STAGE_INDEX_LOOKUP,
  PLAY_LAG_MILLISECONDS,
  SMALL_BLIND_AMOUNT, GAME_STAGE_NEW_HAND
} from '../utils/constants';
import filterAvailablePlayers from '../utils/filterAvailablePlayers';
import findWinners from '../utils/findWinners';
import newDeck from '../utils/newDeck';
import nextPlayerIndex from '../utils/nextPlayerIndex';
import timeout from '../utils/timeout';
import toLookup from '../utils/toLookup';

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
      this.dealStart,
      this.rotateDealer,
      this.dealCards,
      async () => this.runBlind(SMALL_BLIND_AMOUNT),
      async () => this.runBlind(BIG_BLIND_AMOUNT),
      this.goToNextPlayer,
      () => gameStageUpdate(GAME_STAGE_FIRST_BET));
  };

  dealStart = async () => {
    const {
      actions: {
        dealStart
      }
    } = this.props;
    return dealStart(newDeck());
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

  betCheck = async () => {
    const {
      actions: {
        betCheck
      },
      inTurnPlayerIndex,
      players
    } = this.props;
    await betCheck(players[inTurnPlayerIndex]);
    await this.goToNextPlayer();
  };

  betCall = async () => {
    const {
      actions: {
        betCall
      },
      currentBet,
      inTurnPlayerIndex,
      players
    } = this.props;

    const player = players[inTurnPlayerIndex];

    await betCall(player, currentBet - player.playerBet);
    await this.goToNextPlayer();
  };

  betRaise = async () => {
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

    await betRaise(
      player,
      raiseAmount,
      currentBet + raiseAmount - player.playerBet);

    await this.goToNextPlayer();
  };

  betAllIn = () => {

  };

  betFold = async () => {
    const {
      actions: {
        betFold
      },
      inTurnPlayerIndex,
      players
    } = this.props;
    await betFold(players[inTurnPlayerIndex]);
    await this.goToNextPlayer();
  };

  goToNextPlayer = async () => {
    const {
      actions: {
        gameStageUpdate,
        inTurnPlayerIndexUpdate
      },
      currentBet,
      gameStage,
      inTurnPlayerIndex,
      lastRaisePlayerIndex,
      players
    } = this.props;
    const next = nextPlayerIndex(inTurnPlayerIndex, players);
    await inTurnPlayerIndexUpdate(next);

    const allBetsDone = players.every(p => p.playerBusted || p.playerFolded || p.playerBet === currentBet) &&
      next === lastRaisePlayerIndex;

    if (allBetsDone) {
      const currentStageIndex = GAME_STAGE_INDEX_LOOKUP[gameStage];
      const nextGameStage = GAME_STAGES_LIST[currentStageIndex + 1];
      await gameStageUpdate(nextGameStage);
    }
  };

  setRaiseAmount = raiseAmount => {
    this.setState({ raiseAmount });
  };

  dealNextCommunityCard = async () => {
    const {
      actions: {
        dealToCommunity,
        gameStageUpdate
      },
      communityCards,
      deck,
      gameStage
    } = this.props;
    if (communityCards.length === 0) {
      await asyncRunWithDelayBetween(
        PLAY_LAG_MILLISECONDS,
        () => dealToCommunity(deck[0]),
        () => dealToCommunity(deck[1]),
        () => dealToCommunity(deck[2])
      );
    } else {
      await dealToCommunity(deck[0]);
    }

    const nextGameStageIndex = GAME_STAGE_INDEX_LOOKUP[gameStage] + 1;
    const nextGameStage = GAME_STAGES_LIST[nextGameStageIndex];
    gameStageUpdate(nextGameStage);
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
        if (player.playerFolded || player.playerBusted) {
          return;
        }
        const playerHand = bestHandAvailable(communityCards.concat(player.holeCards));
        playerHandUpdate({...player, playerHand});
      }
    );

    await this.evaluateWinners();
  };

  evaluateWinners = async () => {
    const {
      actions: {
        gameStageUpdate,
        playerLost,
        playerWinnerUpdate,
        potDistribute
      },
      dealerPlayerIndex,
      players,
      pot
    } = this.props;
    const winners = findWinners(players);
    if (winners.length === 0) {
      winners.splice(0, 0, players);
    } else {
      const winnerIndexes = toLookup(winners, winner => winner.playerIndex);
      players.forEach(player => !winnerIndexes[player.playerIndex] && playerLost(player));
    }

    const distributionAmount = Math.trunc(pot / winners.length);
    let remainder = pot - (distributionAmount * winners.length);
    let remainderDistributionIndex = dealerPlayerIndex;
    while (remainder--) {
      remainderDistributionIndex = nextPlayerIndex(remainderDistributionIndex, players);
      potDistribute(players[remainderDistributionIndex], 1);
    }
    winners.forEach(player => playerWinnerUpdate(player, distributionAmount));
    gameStageUpdate(GAME_STAGE_NEW_HAND);
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
    players,
    pot
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
    players,
    pot
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayInputs);
