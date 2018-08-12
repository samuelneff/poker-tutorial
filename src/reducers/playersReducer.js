import { PLAYER_ADD_REQUEST } from '../constants/actionTypes';
import initialState from './initialState';

export default function playersReducer(state = initialState.players, action) {
  if (action.type !== PLAYER_ADD_REQUEST) {
    return state;
  }
  return [...state, action.payload];
}
