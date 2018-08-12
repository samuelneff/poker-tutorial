import { combineReducers } from 'redux';
import { types } from './actions';
import initialState from './initialState';

const reducers = {

  communityCards(state = initialState.communityCards, action) {
    if (action.type !== types.COMMUNITY_CARDS_UPDATE_REQUEST) {
      return state;
    }
    return action.payload.cards;
  },

  dealerPlayerIndex(state = initialState.dealerPlayerIndex, action) {
    if (action.type !== types.UPDATE_DEALER_PLAYER_INDEX) {
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
      
      case types.BETS_CLEAR_REQUEST:
        return state.map(
          player => (
            {
              ...player,
              bet: {}
            }
          )
        );

      default:
        return state;
    }
  },

  pot(state = initialState.pot, action) {
    if (action.type !== types.POT_UPDATE_REQUEST) {
      return state;
    }
    return action.payload.pot;
  }
};

export default combineReducers(reducers);
