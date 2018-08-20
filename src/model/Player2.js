

// /////////////////////////////////////////
//
// TUTORIAL
//
// Create two objects, `human` and `computer`
//
// Which has the same data as in the previous
// class example and a single go() method
// that places a bet, just as the previous.
//
//   playerName
//   playerBank
//   playerBet
//   go(callback)
//
//

const human = {};
const computer = {};







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
