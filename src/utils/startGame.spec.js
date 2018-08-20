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
    const start = Date.now();

    let callbackTriggered = false;
    const errors = [];
    const expectations = {
      
      200() {
        expect(gameState.deck.length).toBe(51);
        expect(gameState.players[0].holeCards.length).toBe(1);
        expect(gameState.players[1].holeCards.length).toBe(0);
      },

      300() {
        expect(gameState.deck.length).toBe(50);
        expect(gameState.players[0].holeCards.length).toBe(1);
        expect(gameState.players[1].holeCards.length).toBe(1);
        expect(gameState.players[2].holeCards.length).toBe(0);
      },


      450() {
        expect(gameState.deck.length).toBe(50);
        expect(gameState.players[0].holeCards.length).toBe(1);
        expect(gameState.players[1].holeCards.length).toBe(1);
        expect(gameState.players[2].holeCards.length).toBe(0);
      },

      550() {
        expect(gameState.deck.length).toBe(49);
        expect(gameState.players[0].holeCards.length).toBe(1);
        expect(gameState.players[1].holeCards.length).toBe(1);
        expect(gameState.players[2].holeCards.length).toBe(1);
        expect(gameState.players[3].holeCards.length).toBe(0);
      },


      1050() {
        expect(gameState.deck.length).toBe(47);
        expect(gameState.players[0].holeCards.length).toBe(2);
        expect(gameState.players[1].holeCards.length).toBe(1);
        expect(gameState.players[2].holeCards.length).toBe(1);
        expect(gameState.players[3].holeCards.length).toBe(1);
      },

      1950() {
        expect(gameState.deck.length).toBe(44);
        expect(gameState.players[0].holeCards.length).toBe(2);
        expect(gameState.players[1].holeCards.length).toBe(2);
        expect(gameState.players[2].holeCards.length).toBe(2);
        expect(gameState.players[3].holeCards.length).toBe(2);
        expect(gameState.communityCards.length).toBe(0);
      },

      2050() {
        expect(gameState.deck.length).toBe(43);
        expect(gameState.players[0].holeCards.length).toBe(2);
        expect(gameState.players[1].holeCards.length).toBe(2);
        expect(gameState.players[2].holeCards.length).toBe(2);
        expect(gameState.players[3].holeCards.length).toBe(2);
        expect(gameState.communityCards.length).toBe(1);
      },

      2200() {
        expect(gameState.deck.length).toBe(43);
        expect(gameState.communityCards.length).toBe(1);
      },

      2300() {
        expect(gameState.deck.length).toBe(42);
        expect(gameState.communityCards.length).toBe(2);
      },

      2450() {
        expect(gameState.deck.length).toBe(42);
        expect(gameState.communityCards.length).toBe(2);
      },

      2550() {
        expect(gameState.deck.length).toBe(41);
        expect(gameState.communityCards.length).toBe(3);
      },

      2700() {
        expect(gameState.pot).toBe(0);
      },

      2800() {
        expect(gameState.pot).toBe(5);
      },

      2950() {
        expect(gameState.pot).toBe(5);
      },

      3050() {
        expect(gameState.pot).toBe(15);
      },

      3200() {
        expect(callbackTriggered).toBe(false);
      },

      3450() {
        expect(callbackTriggered).toBe(true);
      },

      3550() {
        if (errors.length) {
          reject(errors);
        } else {
          resolve();
        }
      }
    };

    Object.entries(expectations).forEach(([ delay, fn ]) => {
      setTimeout(
        () => {
          try {
            console.log(`${Date.now() - start} - Testing ${delay}`);
            fn();
          } catch (err) {
            errors.push({[delay]: err});
          }
        },
        parseInt(delay));
    });

    // NOTE: gameStart will run alongside all of our tests
    startGame(gameState, () => callbackTriggered = true);

  }));
