import { types } from './actions';
import initialState from './initialState';

export default function players(state = initialState.players, action) {
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

    case types.BET_ALL_IN:
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
            playerAllIn: playerBank === 0,
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
          if (callAmount === 0) {
            return player;
          }
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
          holeCards: [],
          playerFolded: true
        })
      );

    case types.DEAL_START:
    case types.GAME_START:
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

    case types.PLAYER_LOST:
      return modifyPlayer(
        state,
        action,
        player => ({
          ...player,
          playerBet: 0
        })
      );

    case types.PLAYER_NAME_UPDATE:
      return modifyPlayer(
        state,
        action,
        player => ({
          ...player,
          playerName: action.payload.player.playerName
        })
      );

    case types.PLAYER_WINNER_UPDATE:
      return modifyPlayer(
        state,
        action,
        player => ({
          ...player,
          playerBank: player.playerBank + action.payload.distributionAmount,
          playerBet: action.payload.distributionAmount,
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
          playerBank: player.playerBank + action.payload.distributionAmount,
          playerBet: action.payload.distributionAmount
        })
      );

    default:
      return state;
  }
};

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
