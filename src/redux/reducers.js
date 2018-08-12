import { combineReducers } from 'redux';
import { types } from './actions';
import initialState from './initialState';

/**
 * Helper function for reducers that need to modify one player within the players array
 * 
 * @param {Player[]} players 
 * @param {{player:Player}} action 
 * @param {function(player:Player):Player} modifier 
 */
function modifyPlayer(players, action, modifier) {
  const newPlayers = [...players];

  const modifyIndex = action.payload.player.playerIndex;
  const modifiedPlayer = modifier({...newPlayers[modifyIndex]});      
  newPlayers[modifyIndex] = modifiedPlayer;
  
  return newPlayers;
}

const reducers = {

  communityCards(state = initialState.communityCards, action) {
    if (action.type !== types.COMMUNITY_CARDS_UPDATE_REQUEST) {
      return state;
    }
    return action.payload.cards;
  },

  dealerPlayerIndex(state = initialState.dealerPlayerIndex, action) {
    if (action.type !== types.DEALER_PLAYER_INDEX_UPDATE_REQUEST) {
      return state;
    }
    return action.payload.playerIndex;
  },

  deck(state = initialState.deck, action) {
    switch(action.type) {
      case types.DECK_UPDATE_REQUEST:
        return action.payload.deck;

      default:
        return state;
    }
  },

  inTurnPlayerIndex(state = initialState.inTurnPlayerIndex, action) {
    if (action.type !== types.IN_TURN_PLAYER_INDEX_UPDATE_REQUEST) {
      return state;
    }
    return action.payload.playerIndex;
  },

  players(state = initialState.players, action) {
    switch(action.type) {
      case types.PLAYER_ADD_REQUEST:
        return [...state, action.payload.player];

      case types.PLAYERS_CLEAR_REQUEST:
        return [];
      
      case types.BET_ADD_REQUEST:
        return modifyPlayer(
          state,
          action,
          player => {
            const { betAmount } = action.payload;
            player.playerBank -= betAmount;
            player.playerBet += betAmount;
            return player;
          });

      case types.BETS_CLEAR_REQUEST:
        return state.map(
          player => (
            {
              ...player,
              bet: {}
            }
          )
        );

      case types.BUST_PLAYER_REQUEST:
        return modifyPlayer(state, action, player => player.playerBusted = true);

      default:
        return state;
    }
  },

  pot(state = initialState.pot, action) {
    switch(action.type) {
      case types.POT_UPDATE_REQUEST:
        return action.payload.pot;

      case types.BET_ADD_REQUEST:
        return state + action.payload.betAmount;

      default:
        return state;
    }
  }

};

export default combineReducers(reducers);
