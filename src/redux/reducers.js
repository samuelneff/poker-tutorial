import { combineReducers } from 'redux';
import { types } from './actions';
import initialState from './initialState';
import cardsEqual from '../utils/cardsEqual';

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
      case types.COMMUNITY_CARDS_UPDATE:
        return action.payload.cards;

      case types.CARD_DEAL_TO_COMMUNITY:
        return [ ...state, action.payload.card ];

      default:
        return state;
    }
  },

  currentBet(state = initialState.currentBet, action) {
    switch (action.type) {
      
      case types.BET_RAISE:
        return state + action.payload.raiseAmount;
      
      case types.BETS_CLEAR:
        return 0;

      default:
        return state;
    }
  },

  dealerPlayerIndex(state = initialState.dealerPlayerIndex, action) {
    if (action.type !== types.DEALER_PLAYER_INDEX_UPDATE) {
      return state;
    }
    return action.payload.playerIndex;
  },

  deck(state = initialState.deck, action) {
    switch (action.type) {
      case types.DECK_UPDATE:
        return action.payload.deck;

      case types.CARD_DEAL_TO_COMMUNITY:
      case types.CARD_DEAL_TO_PLAYER: {
        const { card } = action.payload;
        return state.filter(deckCard => !cardsEqual(deckCard, card));
      }
      default:
        return state;
    }
  },

  inTurnPlayerIndex(state = initialState.inTurnPlayerIndex, action) {
    if (action.type !== types.IN_TURN_PLAYER_INDEX_UPDATE) {
      return state;
    }
    return action.payload.playerIndex;
  },

  lastRaiseAmount(state = initialState.lastRaiseAmount, action) {
    if (action.type !== types.BET_RAISE) {
      return state;
    }
    return action.payload.raiseAmount;
  },

  lastRaisePlayerIndex(state = initialState.lastRaisePlayerIndex, action) {
    if (action.type !== types.BET_RAISE) {
      return state;
    }
    return action.payload.player.playerIndex;
  },

  players(state = initialState.players, action) {
    switch (action.type) {
      case types.BET_RAISE:
        return modifyPlayer(
          state,
          action,
          player => {
            let { playerBank, playerBet } = player;
            const { raiseAmount } = action.payload;
            playerBank -= raiseAmount;
            playerBet += raiseAmount;
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
          player => {
            let { playerBank, playerBet } = player;
            const { callAmount } = action.payload;
            playerBank -= callAmount;
            playerBet += callAmount;
            return {
              ...player,
              playerBank,
              playerBet
            };
          }
        );

      case types.BET_FOLD:
        return modifyPlayer(
          state,
          action,
          player => ({
            ...player,
            playerFolded: true
          })
        );

      case types.BETS_CLEAR:
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

      case types.CARD_DEAL_TO_PLAYER:
        return modifyPlayer(
          state,
          action,
          player => ({
            ...player,
            holeCards: [ ...player.holeCards, action.payload.card ]
          })
        );

      case types.BUST_PLAYER:
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
            playerWinner: true
          })
        );

      case types.PLAYERS_CLEAR:
        return [];
      
      default:
        return state;
    }
  },

  pot(state = initialState.pot, action) {
    switch (action.type) {
      case types.BET_CALL:
        return state + action.payload.callAmount;

      case types.BET_RAISE:
        return state + action.payload.raiseAmount;

      case types.BETS_CLEAR:
        return 0;
        
      case types.POT_UPDATE:
        return action.payload.pot;

      default:
        return state;
    }
  }

};

export default combineReducers(reducers);
