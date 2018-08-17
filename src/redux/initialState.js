import { GAME_STAGE_NOT_STARTED } from '../utils/constants';
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
