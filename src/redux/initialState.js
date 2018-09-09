import { GAME_STAGE_NOT_STARTED } from '../utils/constants';

/*

        Tutorial: Redux Store


        The initial state represents the object structure of the store.

        Discussion of store and propagation to components.
 */

/**
 * @constant
 * @type {InitialState}
 */
const initialState = {
  currentBet: 0,
  communityCards: [],
  dealerPlayerIndex: null,
  deck: [],
  gameStage: GAME_STAGE_NOT_STARTED,
  inTurnPlayerIndex: 0,
  lastRaiseAmount: 0,
  lastRaisePlayerIndex: 0,
  players: [],
  pot: 0
};

export default initialState;
