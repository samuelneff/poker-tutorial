
/**
 * Given a gameState object, initializes a new game by dealing player cards,
 * dealing community cards, and then running the blinds.
 *
 * @param {object} gameState
 * @param {Function} callback
 */
function startGame(gameState, callback) {

  // /////////////////////////////////////////
  //
  // TUTORIAL
  //
  // To start a poker game we have three actions:
  // (1) Deal cards to players
  // (2) Deal community cards
  // (3) First two payers make blind bets
  //
  // This file has a method already implemented for each of these.
  // Implement startGame(gameState, callback) to call
  // each of these methods in sequence and then trigger
  // the callback.
  //
  // Basically like this:
  //
  //     dealPlayerCards(gameState, ?)
  //     dealCommunityCards(gameState, ?)
  //     runBlinds(gameState, ?)
  //
  // But use callbacks to make the methods run sequentially.
  //
  // Run this file to execute and verify the sequential behavior
  //
  //   node src/utils/startGame.js
  //














  // /////////////////////////////////////////
  //
  // TUTORIAL
  //
  // With the above task all complete and tests passing,
  // comment out all of the code you just wrote, and do
  // it again but this time using promises.
  //
  // All of the three functions return a promise (the
  // callback argument is optional).
  //
  // Promises have a then() method that takes a function
  // that is triggered when the promise is resolved.
  // Chain the then methods to run promises sequentially.
  //














  // /////////////////////////////////////////
  //
  // TUTORIAL
  //
  // With the above task all complete and tests passing,
  // comment out all of the code you just wrote (again),
  // and do it a third time but this time using async and await.
  //
  // async and await use promises under the hood so any
  // function that returns a promise can be 'await'ed upon.
  //
  // We don't want to change the signature to startGame() so
  // to use async and await we'll need to create a new async
  // function and then immediately invoke it.
  //
  // An async function has the `async` keyword before `function`
  // and then can use `await` on any method that returns a promise
  // to essentially halt execution until that method returns
  //



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
    log(`Dealing ${card.rank}${card.suit} to ${player.playerName}`);
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
        log(`Dealing ${card.rank}${card.suit} to community cards`);
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
      log(`Player ${player.playerName} bets ${amount}`);
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

let start;
function log(message) {
  if (start === undefined) {
    start = Date.now();
  }
  console.log(`${(Date.now() - start).toString().padStart(4, ' ')} - ${message}`);
}

if (require.main === module) {

  log('Starting game');
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
  startGame(gameState, () => log('Ready to play now'));
} else {
  module.exports = startGame;
}

