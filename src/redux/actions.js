export const types = {
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
  PLAYER_ADD: 'PLAYER_ADD',
  PLAYER_BUST: 'PLAYER_BUST',
  PLAYER_HAND_UPDATE: 'PLAYER_HAND_UPDATE',
  PLAYER_LOST: 'PLAYER_LOST',
  PLAYER_WINNER_UPDATE: 'PLAYER_WINNER_UPDATE',
  PLAYERS_CLEAR: 'PLAYERS_CLEAR',
  POT_DISTRIBUTE: 'POT_DISTRIBUTION',
  POT_UPDATE: 'POT_UPDATE'
};

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

export function playerAdd(player) {
  return {
    type: types.PLAYER_ADD,
    payload: {
      player
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
