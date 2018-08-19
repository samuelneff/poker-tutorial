import startGame from './startGame';

it('Asynchronous tests of startGame', () =>
  new Promise((resolve, reject) => {
    const gameState = {
      deck: [
        {rank: '0', suit: 'C'},
        {rank: '0', suit: 'D'},
        {rank: '0', suit: 'H'},
        {rank: '0', suit: 'S'},
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
        {rank: '4', suit: 'H'},
        {rank: '4', suit: 'S'},
        {rank: '5', suit: 'S'},
        {rank: '5', suit: 'C'},
        {rank: '5', suit: 'D'},
        {rank: '5', suit: 'H'},
        {rank: '6', suit: 'C'},
        {rank: '6', suit: 'D'},
        {rank: '6', suit: 'H'},
        {rank: '6', suit: 'S'},
        {rank: '7', suit: 'C'},
        {rank: '7', suit: 'D'},
        {rank: '7', suit: 'H'},
        {rank: '7', suit: 'S'},
        {rank: '8', suit: 'C'},
        {rank: '8', suit: 'D'},
        {rank: '8', suit: 'H'},
        {rank: '8', suit: 'S'},
        {rank: '9', suit: 'C'},
        {rank: '9', suit: 'D'},
        {rank: '9', suit: 'H'},
        {rank: '9', suit: 'S'},
        {rank: 'A', suit: 'C'},
        {rank: 'A', suit: 'D'},
        {rank: 'A', suit: 'H'},
        {rank: 'A', suit: 'S'},
        {rank: 'J', suit: 'C'},
        {rank: 'J', suit: 'D'},
        {rank: 'J', suit: 'H'},
        {rank: 'J', suit: 'S'},
        {rank: 'K', suit: 'C'},
        {rank: 'K', suit: 'D'},
        {rank: 'K', suit: 'H'},
        {rank: 'K', suit: 'S'},
        {rank: 'Q', suit: 'C'},
        {rank: 'Q', suit: 'D'},
        {rank: 'Q', suit: 'H'},
        {rank: 'Q', suit: 'S'}
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
    let callbackTriggered = false;

    const errors = [];
    const expectations = {
      
      240() {
        expect(gameState.deck.length).toBe(51);
        expect(gameState.players[0].holeCards.length).toBe(1);
        expect(gameState.players[1].holeCards.length).toBe(0);
      },

      260() {
        expect(gameState.deck.length).toBe(50);
        expect(gameState.players[0].holeCards.length).toBe(1);
        expect(gameState.players[1].holeCards.length).toBe(1);
        expect(gameState.players[2].holeCards.length).toBe(0);
      },


      490() {
        expect(gameState.deck.length).toBe(50);
        expect(gameState.players[0].holeCards.length).toBe(1);
        expect(gameState.players[1].holeCards.length).toBe(0);
      },

      510() {
        expect(gameState.deck.length).toBe(49);
        expect(gameState.players[0].holeCards.length).toBe(1);
        expect(gameState.players[1].holeCards.length).toBe(1);
        expect(gameState.players[2].holeCards.length).toBe(1);
        expect(gameState.players[3].holeCards.length).toBe(0);
      },


      1010() {
        expect(gameState.deck.length).toBe(48);
        expect(gameState.players[0].holeCards.length).toBe(1);
        expect(gameState.players[1].holeCards.length).toBe(1);
        expect(gameState.players[2].holeCards.length).toBe(1);
        expect(gameState.players[3].holeCards.length).toBe(1);
      },

      1990() {
        expect(gameState.deck.length).toBe(45);
        expect(gameState.players[0].holeCards.length).toBe(2);
        expect(gameState.players[1].holeCards.length).toBe(2);
        expect(gameState.players[2].holeCards.length).toBe(2);
        expect(gameState.players[3].holeCards.length).toBe(1);
      },

      2010() {
        expect(gameState.deck.length).toBe(44);
        expect(gameState.players[0].holeCards.length).toBe(2);
        expect(gameState.players[1].holeCards.length).toBe(2);
        expect(gameState.players[2].holeCards.length).toBe(2);
        expect(gameState.players[3].holeCards.length).toBe(2);
        expect(gameState.communityCards.length).toBe(0);
      },

      2240() {
        expect(gameState.deck.length).toBe(44);
        expect(gameState.communityCards.length).toBe(0);
      },

      2260() {
        expect(gameState.deck.length).toBe(43);
        expect(gameState.communityCards.length).toBe(1);
      },

      2490() {
        expect(gameState.deck.length).toBe(43);
        expect(gameState.communityCards.length).toBe(1);
      },

      2510() {
        expect(gameState.deck.length).toBe(42);
        expect(gameState.communityCards.length).toBe(2);
      },

      2990() {
        expect(gameState.pot).toBe(0);
      },

      3010() {
        expect(gameState.pot).toBe(5);
      },

      3240() {
        expect(gameState.pot).toBe(5);
      },

      3260() {
        expect(gameState.pot).toBe(15);
      },

      3490() {
        expect(callbackTriggered).toBe(false);
      },

      3510() {
        expect(callbackTriggered).toBe(true);
      },

      3750() {
        if (errors.length) {
          reject(errors);
        } else {
          resolve();
        }
      }
    };

    // NOTE: gameStart will run alongside all of our tests
    startGame(gameState, () => callbackTriggered = true);

    Object.entries(expectations).forEach(([ delay, fn ]) => {
      setTimeout(
        () => {
          try {
            console.log(`Testing ${delay}`);
            fn();
          } catch (err) {
            errors.push({[delay]: err});
          }
        },
        parseInt(delay));
    });
  }));
