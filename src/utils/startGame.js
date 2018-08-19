
/**
 * Given a gameState object, initializes a new game by dealing player cards,
 * dealing community cards, and then running the blinds.
 *
 * @param {object} gameState
 * @param {Function} callback
 */
function startGame(gameState, callback) {
/*
  dealPlayerCards(
    gameState,
    () => dealCommunityCards(
      gameState,
      () => runBlinds(
        gameState,
        callback)));
*/
  /*
  dealPlayerCards(gameState)
    .then(() => dealCommunityCards(gameState))
    .then(() => runBlinds(gameState));
    */

  (async () => {
    await dealPlayerCards(gameState);
    await dealCommunityCards(gameState);
    await runBlinds(gameState);
    callback();
  })();
}

/**
 * @typedef {object} GameState
 * @property {Array.<Card>} deck
 * @property {Array.<Card>} communityCards
 * @property {Array.<Player>} players
 * @property {number} pot
 * @property {number} inTurnPlayerIndex
 */

/**
 * Deals two cards to each player.
 * @param {GameState} gameState
 * @param {Function} callback
 */
function dealPlayerCards(gameState, callback) {
  let p;
  if (callback === undefined) {
    p = new Promise(r => callback = r);
  }

  dealPlayerCard(0, () => dealPlayerCard(0, callback));
  
  function dealPlayerCard(index, next) {
    if (index === gameState.players.length) {
      next();
      return;
    }
    const card = gameState.deck.shift();
    const player = gameState.players[index];
    console.log(`Dealing ${card.rank}${card.suit} to ${player.playerName}`);
    player.holeCards.push(card);
    setTimeout(() => dealPlayerCard(index + 1, next), 250);
  }

  return p;
}

/**
 * Deals two cards to the community cards.
 * @param {GameState} gameState
 * @param {Function} callback
 */
function dealCommunityCards(gameState, callback = noop) {

  return dealCommunityCard()
    .then(() => timeout(250))
    .then(dealCommunityCard)
    .then(() => timeout(250))
    .then(dealCommunityCard)
    .then(() => timeout(250))
    .then(callback);

  function dealCommunityCard() {
    return new Promise((resolve, reject) => {
      try {
        const card = gameState.deck.shift();
        console.log(`Dealing ${card.rank}${card.suit} to community cards`);
        gameState.communityCards.push(card);
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }
}

/**
 * Has the player in turn bet small blind, then next player
 * bets big blind, then calls callback.
 *
 * @param {GameState} gameState
 * @param {Function} callback
 */
function runBlinds(gameState, callback = noop) {
  async function runBlindsImpl() {
    async function bet(player, amount) {
      console.log(`Player ${player.playerName} bets ${amount}`);
      player.playerBank -= amount;
      player.playerBet += amount;
      gameState.pot += amount;
    }

    await bet(gameState.players[gameState.inTurnPlayerIndex++], 5);
    await timeout(250);
    await bet(gameState.players[gameState.inTurnPlayerIndex++], 10);
    await timeout(250);
    callback();
  }
  return runBlindsImpl();
}

function noop() {

}

function timeout(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

if (require.main === module) {
  console.log('Starting game');
  const gameState = {
    deck: [
      {rank: '2', suit: 'C'},
      {rank: '2', suit: 'D'},
      {rank: '2', suit: 'H'},
      {rank: '2', suit: 'S'},
      {rank: '3', suit: 'C'},
      {rank: '3', suit: 'D'},
      {rank: '3', suit: 'H'},
      {rank: '3', suit: 'S'},
      {rank: '4', suit: 'C'},
      {rank: '4', suit: 'D'},
      {rank: '4', suit: 'H'}
    ],
    communityCards: [],
    players: [
      {
        playerName: 'Caden',
        playerBank: 100,
        playerBet: 0,
        holeCards: []
      },
      {
        playerName: 'Caitlin',
        playerBank: 100,
        playerBet: 0,
        holeCards: []
      },
      {
        playerName: 'Claire',
        playerBank: 100,
        playerBet: 0,
        holeCards: []
      },
      {
        playerName: 'Cole',
        playerBank: 100,
        playerBet: 0,
        holeCards: []
      }
    ],
    pot: 0,
    inTurnPlayerIndex: 0
  };
  startGame(gameState, () => console.log('Ready to play now'));
} else {
  module.exports = startGame;
}
