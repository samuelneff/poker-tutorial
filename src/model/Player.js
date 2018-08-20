
class AbstractPlayer {
  constructor(playerName, playerBank) {
    this.holeCards = [];
    this.playerName = playerName;
    this.playerBank = playerBank;
    this.playerBet = 0;
    this.playerFolded = false;
    this.playerBusted = false;
  }

  bet(amount) {
    console.log(`${this.playerName} bets ${amount}`);
    this.playerBank -= amount;
    this.playerBet += amount;
  }

  fold() {
    this.playerFolded = true;
  }

  bust() {
    this.playerBusted = true;
  }

  go(callback) {
    throw new Error('go() must be implemented by derived class.');
  }
}

// /////////////////////////////////////////
//
// TUTORIAL
//
// Implement two derived classes, one called
// HumanPlayer and another called ComputerPlayer.
//
// Utilize `class` and `extends`
//
// Each constructor should pass an actual name
// and amount for the bank, using constructor()
// and super().
//
// Then implement the go(callback) method to
// place a bet and then trigger the callback.
//
// Human player should call getBetFromUser()
// to prompt the console for a bet and computer
// player should place a random bet.
//


class HumanPlayer extends AbstractPlayer {
  constructor() {
    super('Human', 1000);
  }

  go(callback) {
    getBetFromUser(
      this,
      amount => {
        this.bet(amount);
        callback();
      }
    );
  }
}

class ComputerPlayer extends AbstractPlayer {
  constructor() {
    super('Computer', 1000);
  }

  go(callback) {
    this.bet(Math.round(this.playerBank * Math.random()));
    callback();
  }
}

const std = require('readline').createInterface(process.stdin, process.stdout);

function getBetFromUser(player, callback) {
  console.log(`You have $${player.playerBank}, how much do you bet? `);

  std.question('$ ', processLine);

  function processLine(line) {
    const amount = parseInt(line);
    if (Number.isNaN(amount)) {
      console.log(`Amount entered is not a valid number, '${line}'.`);
      console.log();
      getBetFromUser(player, callback);
      return;
    }

    callback(amount);
  }
}

const human = new HumanPlayer();
const computer = new ComputerPlayer();

let count = 5;
runPlay();

function runPlay() {
  human.go(
    () => computer.go(
      () => {
        if (count--) {
          runPlay();
        } else {
          std.close();
        }
      }));
}
