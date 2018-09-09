import { combineReducers } from 'redux';
import { types } from './actions';
import initialState from './initialState';
import cardsEqual from '../utils/cardsEqual';
import { GAME_STAGE_NEW_HAND } from '../utils/constants';


/*
          Tutorial: Reducers

          Reducers are pure functions--they take in arguments, return a consistent value,
          and have no side effects.

          Reducers always take two arguments: state and action.

          state is the present value for that particular reducer.

              Sometimes each reducer managers a small object, but even better when each
              reducer manages an individual scalar value or array of values.

              state is generally undefined on first call and each return must be
              a non-undefined value. null is ok.

          action is the object from actions.js

              The action object is always be defined and always has a type property.

              It will not always have a payload or meta. Redux itself sends out actions
              of its own and some libraries will send out actions. You'll usually ignore
              these actions but need to be aware they may not have a payload.

          Every reducer is called with every action. If the data the reducer manages is
          not modified by the action, then it must return the state argument as is. If
          the reducer does make a change based on the action, it must return a new object.
          state must be treated as immutable.

          Reducers can be arranged as one function per file or as a single object with
          keys corresponding to names of state properties and functions to generate
          the data from actions.

          Redux provides a helper called combineReducers to create a single reducer function
          from an object of key/function pairs.

          Here we already have an object with reducers. We're going to add a single new
          reducer to manage the players array.

          The initial (default) state for the players array should be an empty array.

          If the action is not one of the two we just created, then ignore it and return
          the passed-in state exactly as was provided.

          Refer to ChoosePlayers.js for how to create a new players array while modifying
          the name of one player without modifying the original array at all.

          When done, review the combineReducers() call at the end of the file.
*/

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

      case types.BET_ALL_IN:
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

      case types.BET_ALL_IN:
        case types.BET_RAISE:
        return action.payload.player.playerIndex;

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
