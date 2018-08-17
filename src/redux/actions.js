export const types = {
  BET_CALL: 'BET_CALL',
  BET_FOLD: 'BET_FOLD',
  BET_RAISE: 'BET_RAISE',
  BETS_CLEAR: 'BETS_CLEAR',
  CARD_DEAL_TO_COMMUNITY: 'CARD_DEAL_TO_COMMUNITY',
  CARD_DEAL_TO_PLAYER: 'CARD_DEAL_TO_PLAYER',
  BUST_PLAYER: 'BUST_PLAYER',
  COMMUNITY_CARDS_UPDATE: 'COMMUNITY_CARDS_UPDATE',
  DEALER_PLAYER_INDEX_UPDATE: 'DEALER_PLAYER_INDEX_UPDATE',
  DECK_UPDATE: 'DECK_UPDATE',
  IN_TURN_PLAYER_INDEX_UPDATE: 'IN_TURN_PLAYER_INDEX_UPDATE',
  PLAYER_ADD: 'PLAYER_ADD',
  PLAYER_HAND_UPDATE: 'PLAYER_HAND_UPDATE',
  PLAYER_WINNER_UPDATE: 'PLAYER_WINNER_UPDATE',
  PLAYERS_CLEAR: 'PLAYERS_CLEAR',
  POT_UPDATE: 'POT_UPDATE'
};

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

export function betsClear() {
  return {
    type: types.BETS_CLEAR,
    payload: {}
  };
}

export function bustPlayer(player) {
  return {
    type: types.BUST_PLAYER,
    payload: {
      player
    }
  };
}

export function cardDealToCommunity(card) {
  return {
    type: types.CARD_DEAL_TO_COMMUNITY,
    payload: {
      card
    }
  };
}

export function cardDealToPlayer(player, card) {
  return {
    type: types.CARD_DEAL_TO_PLAYER,
    payload: {
      player,
      card
    }
  };
}

export function communityCardsUpdate(cards) {
  return {
    type: types.COMMUNITY_CARDS_UPDATE,
    payload: {
      cards
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
export function deckUpdate(deck) {
  return {
    type: types.DECK_UPDATE,
    payload: {
      deck
    }
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

export function playerWinnerUpdate(player) {
  return {
    type: types.PLAYER_WINNER_UPDATE,
    payload: {
      player
    }
  };
}

export function playersClear() {
  return {
    type: types.PLAYERS_CLEAR,
    payload: {}
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
