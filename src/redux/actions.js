/*

     
          Tutorial: Actions
     
          Actions are plain JavaScript objects that contain
          information about what is changing in the app.
     
          Every action by conventions has three properties,
          referred to as a Flux Standard Action
     
              {
                  type: SOME_CONSTANT,   // string
                  payload: {},           // object
                  meta: {},              // optional object
                  error: true            // optional, indicates the action represents an error
              }
     
          Types are always defined as constants and are used to identify actions.
     
          Payload contains the data related to an action.
     
          Meta is object that contains more information about the action (rare).
     
     
     
          For this tutorial we're going to wire up the ChoosePlayers form which involves adding new players
          and updating their names.

          We're going to need two new actions, PLAYER_ADD and PLAYER_NAME_UPDATE.

          PLAYER_ADD needs no arguments and should have a payload with the default player object
          like we did in ChoosePlayers

              {
                  player: {
                      playerName: '',
                      playerBank: 1000
                  }
              }

          PLAYER_NAME_UPDATE needs a single argument, the playerName, and passes that along in the payload

              {
                  player: {
                      playerName,
                  }
              }
*/

export const types = {
  BET_ALL_IN: 'BET_ALL_IN',
  BET_BLIND: 'BET_BLIND',
  BET_CALL: 'BET_CALL',
  BET_FOLD: 'BET_FOLD',
  BET_RAISE: 'BET_RAISE',
  DEAL_START: 'DEAL_START',
  DEAL_TO_COMMUNITY: 'DEAL_TO_COMMUNITY',
  DEAL_TO_PLAYER: 'DEAL_TO_PLAYER',
  DEALER_PLAYER_INDEX_UPDATE: 'DEALER_PLAYER_INDEX_UPDATE',
  GAME_START: 'GAME_START',
  GAME_STAGE_UPDATE: 'GAME_STAGE_UPDATE',
  IN_TURN_PLAYER_INDEX_UPDATE: 'IN_TURN_PLAYER_INDEX_UPDATE',
  PLAYER_BUST: 'PLAYER_BUST',
  PLAYER_HAND_UPDATE: 'PLAYER_HAND_UPDATE',
  PLAYER_LOST: 'PLAYER_LOST',
  PLAYER_NAMES_LOAD: 'PLAYER_NAMES_LOAD',
  PLAYER_WINNER_UPDATE: 'PLAYER_WINNER_UPDATE',
  PLAYERS_CLEAR: 'PLAYERS_CLEAR',
  POT_DISTRIBUTE: 'POT_DISTRIBUTION',
  POT_UPDATE: 'POT_UPDATE'
};

export function betAllIn(player, raiseAmount, totalBetAmount) {
  return {
    type: types.BET_ALL_IN,
    payload: {
      player,
      raiseAmount,
      totalBetAmount
    }
  };
}

export function betBlind(player, blindAmount) {
  return {
    type: types.BET_BLIND,
    payload: {
      player,
      blindAmount
    }
  };
}

export function betCall(player, callAmount) {
  return {
    type: types.BET_CALL,
    payload: {
      player,
      callAmount
    }
  };
}

export function betCheck(player) {
  return {
    type: types.BET_CALL,
    payload: {
      player,
      callAmount: 0
    }
  };
}

export function betFold(player) {
  return {
    type: types.BET_FOLD,
    payload: {
      player
    }
  };
}

export function betRaise(player, raiseAmount, totalBetAmount) {
  return {
    type: types.BET_RAISE,
    payload: {
      player,
      raiseAmount,
      totalBetAmount
    }
  };
}

export function bustPlayer(player) {
  return {
    type: types.PLAYER_BUST,
    payload: {
      player
    }
  };
}

export function dealStart(newDeck) {
  return {
    type: types.DEAL_START,
    payload: {
      newDeck
    }
  };
}

export function dealToCommunity(card) {
  return {
    type: types.DEAL_TO_COMMUNITY,
    payload: {
      card
    }
  };
}

export function dealToPlayer(player, card) {
  return {
    type: types.DEAL_TO_PLAYER,
    payload: {
      player,
      card
    }
  };
}

export function dealerPlayerIndexUpdate(playerIndex) {
  return {
    type: types.DEALER_PLAYER_INDEX_UPDATE,
    payload: {
      playerIndex
    }
  };
}
export function gameStageUpdate(gameStage) {
  return {
    type: types.GAME_STAGE_UPDATE,
    payload: {
      gameStage
    }
  };
}

export function gameStart() {
  return {
    type: types.GAME_START,
    payload: {}
  };
}

export function inTurnPlayerIndexUpdate(playerIndex) {
  return {
    type: types.IN_TURN_PLAYER_INDEX_UPDATE,
    payload: {
      playerIndex
    }
  };
}

export function playerHandUpdate(player) {
  return {
    type: types.PLAYER_HAND_UPDATE,
    payload: {
      player
    }
  };
}

export function playerLost(player) {
  return {
    type: types.PLAYER_LOST,
    payload: {
      player
    }
  };
}

export function playerNamesLoad() {
  return {
    type: types.PLAYER_NAMES_LOAD
  };
}

export function playerWinnerUpdate(player, distributionAmount) {
  return {
    type: types.PLAYER_WINNER_UPDATE,
    payload: {
      player,
      distributionAmount
    }
  };
}

export function playersClear() {
  return {
    type: types.PLAYERS_CLEAR,
    payload: {}
  };
}

export function potDistribute(player, distributionAmount) {
  return {
    type: types.POT_DISTRIBUTE,
    payload: {
      player,
      distributionAmount
    }
  };
}

export function potUpdate(pot) {
  return {
    type: types.POT_UPDATE,
    payload: {
      pot
    }
  };
}
