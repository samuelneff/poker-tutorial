import { combineReducers } from 'redux';
import { GAME_STAGE_NEW_HAND } from '../utils/constants';
import { types } from './actions';
import initialState from './initialState';
import cardsEqual from '../utils/cardsEqual';
import recordPlayerBet from '../utils/recordPlayerBet';

/**
 * Helper function for reducers that need to modify one player within the players array
 * 
 * @param {Player[]} players 
 * @param {{payload:{player:Player}}} action
 * @param {function(player:Player):Player} modifier 
 */
function modifyPlayer(players, action, modifier) {
  const newPlayers = [...players];

  const modifyIndex = action.payload.player.playerIndex;
  const newPlayer = {...newPlayers[modifyIndex]};
  
  // modified can return a new player entirely (complex update) or it can change just one property (scalar change)
  const maybeModifiedPlayer = modifier(newPlayer);
  newPlayers[modifyIndex] = maybeModifiedPlayer && maybeModifiedPlayer.playerIndex === modifyIndex
    ? maybeModifiedPlayer
    : newPlayer;
  
  return newPlayers;
}

const reducers = {

  communityCards(state = initialState.communityCards, action) {
    switch (action.type) {
      case types.DEAL_START:
        return [];

      case types.DEAL_TO_COMMUNITY:
        return [ ...state, action.payload.card ];

      case types.GAME_START:
        return [];

      default:
        return state;
    }
  },

  currentBet(state = initialState.currentBet, action) {
    switch (action.type) {
      
      case types.BET_BLIND:
        return action.payload.blindAmount;

      case types.BET_RAISE:
        return state + action.payload.raiseAmount;
      
      case types.DEAL_START:
        return 0;

      default:
        return state;
    }
  },

  dealerPlayerIndex(state = initialState.dealerPlayerIndex, action) {
    switch (action.type) {

      case types.DEALER_PLAYER_INDEX_UPDATE:
        return action.payload.playerIndex;

      case types.GAME_START:
        return null;

      default:
        return state;
    }
  },

  deck(state = initialState.deck, action) {
    switch (action.type) {
      case types.DEAL_START:
        return action.payload.newDeck;

      case types.DEAL_TO_COMMUNITY:
      case types.DEAL_TO_PLAYER: {
        const { card } = action.payload;
        return cardsEqual(state[0], card)
          ? state.slice(1)
          : state.filter(deckCard => !cardsEqual(deckCard, card));
      }

      case types.GAME_START:
        return [];

      default:
        return state;
    }
  },

  gameStage(state = initialState.gameStage, action) {
    switch (action.type) {

      case types.GAME_START:
        return GAME_STAGE_NEW_HAND;

      case types.GAME_STAGE_UPDATE:
        return action.payload.gameStage;

      default:
        return state;
    }
  },

  inTurnPlayerIndex(state = initialState.inTurnPlayerIndex, action) {
    switch (action.type) {
      case types.IN_TURN_PLAYER_INDEX_UPDATE:
        return action.payload.playerIndex;

      case types.GAME_START:
        return null;

      default:
        return state;
    }
  },

  lastRaiseAmount(state = initialState.lastRaiseAmount, action) {
    switch (action.type) {
      case types.BET_BLIND:
        return action.payload.blindAmount;

      case types.BET_RAISE:
        return action.payload.raiseAmount;

      case types.DEAL_START:
        return 0;

      default:
        return state;
    }
  },

  lastRaisePlayerIndex(state = initialState.lastRaisePlayerIndex, action) {
    switch (action.type) {
      case types.BET_BLIND:
        // for blinds, we the blind better gets to check or raise after
        // everyone else has a turn, so treat last raise as person
        // after the blind to give the big blind a chance to check/raise
        return action.payload.player.playerIndex + 1;

      case types.BET_RAISE:
        return action.payload.player.playerIndex;

      default:
        return state;
    }
  },

  players(state = initialState.players, action) {
    switch (action.type) {

      case types.BET_BLIND:
        return modifyPlayer(
          state,
          action,
          player => {
            let { playerBank, playerBet } = player;
            const { blindAmount } = action.payload;
            playerBank -= blindAmount;
            playerBet += blindAmount;
            return {
              ...player,
              playerBank,
              playerBet
            };
          }
        );

      case types.BET_RAISE:
        return modifyPlayer(
          state,
          action,
          player => {
            let { playerBank, playerBet } = player;
            const { totalBetAmount } = action.payload;
            playerBank -= totalBetAmount;
            playerBet += totalBetAmount;
            return {
              ...player,
              playerBank,
              playerBet
            };
          }
        );

      case types.BET_CALL:
        return modifyPlayer(
          state,
          action,
          player => recordPlayerBet(player, action.payload.callAmount));

      case types.BET_FOLD:
        return modifyPlayer(
          state,
          action,
          player => ({
            ...player,
            playerFolded: true
          })
        );

      case types.DEAL_START:
        return state.map(
          player => (
            {
              ...player,
              holeCards: [],
              playerBet: 0,
              playerFolded: false,
              playerHand: null,
              playerWinner: false
            }
          )
        );

      case types.DEAL_TO_PLAYER:
        return modifyPlayer(
          state,
          action,
          player => ({
            ...player,
            holeCards: [ ...player.holeCards, action.payload.card ]
          })
        );

      case types.PLAYER_BUST:
        return modifyPlayer(
          state,
          action,
          player => ({
            ...player,
            playerBusted: true
          })
        );

      case types.PLAYER_ADD:
        return [...state, action.payload.player];

      case types.PLAYER_HAND_UPDATE:
        return modifyPlayer(
          state,
          action,
          player => ({
            ...player,
            playerHand: action.payload.player.playerHand
          })
        );

      case types.PLAYER_WINNER_UPDATE:
        return modifyPlayer(
          state,
          action,
          player => ({
            ...player,
            playerBank: player.playerBank + action.payload.distributionAmount,
            playerWinner: true
          })
        );

      case types.PLAYERS_CLEAR:
        return [];

      case types.POT_DISTRIBUTE:
        return modifyPlayer(
          state,
          action,
          player => ({
            ...player,
            playerBank: player.playerBank + action.payload.distributionAmount
          })
        );

      default:
        return state;
    }
  },

  pot(state = initialState.pot, action) {
    switch (action.type) {
      case types.BET_BLIND:
        return state + action.payload.blindAmount;
        
      case types.BET_CALL:
        return state + action.payload.callAmount;

      case types.BET_RAISE:
        return state + action.payload.raiseAmount;

      case types.DEAL_START:
        return 0;

      case types.GAME_START:
        return 0;

      case types.POT_UPDATE:
        return action.payload.pot;

      default:
        return state;
    }
  }

};

export default combineReducers(reducers);
