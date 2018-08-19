/**
 * Given a player and a bet amount, return the player as is if
 * there is no bet, or return a new player object with bet appropriately
 * deducted from playerBank and added to playerBet, without modifying
 * the original player object
 * @param {object} player
 * @param {number} player.playerBank
 * @param {number} player.playerBet
 * @param {number|null|undefined} bet
 * @returns {{playerBank: number, playerBet:number}}
 */
function recordPlayerBet(player, bet) {

  // /////////////////////////////////////////
  //
  // TUTORIAL
  //
  // Return the player as is if bet is
  // zero, undefined, or null
  //



  // /////////////////////////////////////////
  //
  // TUTORIAL
  //
  // Deconstruct playerBank and playerBet,
  // then increment/decrement as appropriate
  //
  // Example: Given an object
  //
  // const obj = { a: 1, b: 2, c: 3 };
  //
  // You can separate to two different variables like this
  //
  // let { a, b } = obj;
  //
  // which is the same as
  //
  // const a = obj.a;
  // const b = obj.b;
  //




  // /////////////////////////////////////////
  //
  // TUTORIAL
  //
  // Now return a new object player object
  // that has everything from the player argument
  // along with the new playerBank and playerBet
  // values
  //
  // Example: given the obj declaration in the previous example
  // we can create ane shallow copy as is like this:
  //
  // const shallowCopy = { ...obj };
  //
  // and we can specify default values like this:
  //
  // const defaulted = { d: 4, ...obj };
  //
  // or we can provide specific overridden values
  //
  // const overridden  = { ...obj, a: 0 };
  //




}








if (require.main === module) {

  const original = {
    playerName: 'Sam',
    playerBank: 100,
    playerBet: 0
  };
  const afterBet = recordPlayerBet(original, 15);

  console.dir({ original }, { colors: true});
  console.dir({ afterBet }, {colors: true });
  console.log(
    original === afterBet
      ? 'Replaced object but shouldn\'t have'
      : 'Returned new object as expected');

} else {
  module.exports = recordPlayerBet;
}
