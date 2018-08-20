# Tutorial 1: JavaScript

For this tutorial you'll review a number of incomplete functions and unit tests.

# Concepts

The tutorial will review these modern JavaScript concepts:

1. `let`, `const`
2. functional first, functions and arrow functions
3. object and array destructuring, spread 
4. everything is asynchronous: callbacks, promises, `asyc`/`await`
5. objects, classes, inheritance, object methods
6. `every`, `some`, `reduce`, `keys`, `values`, `entries`
7. HTTP calls
8. best practices, eslint, airbnb
9. Debugging
10. JSDocke
11. TypeScript
12. MDN

# Tutorial Steps

## create array, for-loop, objects

1. Open `src/utils/newDeck.js`
2. Use a traditional `for` loop to create a deck of cards
3. Run the file as a node script
  * `node src/utils/newDeck.js`
4. Notice the output shoudl be an array of objects.

## Running unit tests

1. Open `src/utils/newDeck.spec.js` (ideally in adjacent IDE pane)
2. Run the tests; the first two tests should pass: `shouldReturnArray` and `shouldReturn52Cards`
  * Ideally run within IDE
    1. Right-click on the file tab
    2. Select *Run 'newDeck.spec.js'*
  * Run in terminal with `npm test newDeck`

## `forEach` loops   

1. Scroll to `function shouldReturn13OfEachSuit()` within IDE tab
2. Implement the center of the function to count how many card of each suit there are
3. Use `forEach` to loop over the deck
4. Use `if` / `else` to determine which suit to increment
5. Run the the tests, it should pass now

## Chaining `map` and `forEach`

1. Scroll to the next test `function shouldReturnFourOfEachRank`
2. Use `map()` to convert the card array to an array of ranks
3. Use `forEach()` to loop over the ranks
4. Use property access and a ternary to assign the right value
5. Run the test, it should pass now

## `while` and `Math`

1. Scroll to the last test `function shouldBeShuffled`
2. This test is fully implemented but fails
3. Follow the instructions to create and use a `shuffle` function to shuffle the deck
4. Use `while`, `Math.random()` and `Math.trunc()`
5. Run the test and iterate the shuffle until it passes

## Object deconstruction and the spread operator

. Open `src/utils/recordPlayerBet.js`
. Follow instructions to implement the function
  * Use object deconstruction to create local variables
  * Use spread operator to create a new return object
. Run tests `src/utils/recordPlayerBet.spec.js`
. If implemented properly, all tests should pass.

## Callbacks, Promises, and `async` / `await`

1. Open `src/utils/startGame.js`
2. Follow the instructions to implement `startGame()` using callbacks
3. Run in terminal to see how it runs with delays
  * `node src/utils/startGame.js`
4. Run unit test `startGame.spec.js` to verify timing
5. Comment out the implementation you just wrote and re-write using promises
6. Verify method still works properly
7. Comment out the promises implementation and re-write with `async` and `await`
8. Verify method still works properly

## Classes and inheritance

1. Open `src/model/Player.js`
2. Review the existing `AbstractPlayer` class
3. Implement `HumanPlayer` and `ComputerPlayer` per directions
4. Run the script and enter some bets, verify interaction
  * `node src/model/Player.js`
5. No unit tests for this one (it uses stdin).

## Objects and object methods

1. Open `src/model/Player2.js`
2. Create `human` and `computer` objects with same requirements as the previous example but as individual objects, not classes.
3. Run the script and enter some bets, verify interaction
  * `node src/model/Player2.js`
4. No unit tests for this one (it uses stdin).

## `Array.every()`
1. Open `src/utils/isFlush.js`
2. Implement the method `isFlush`
3. Open `src/utils/isFlush.spec.js`
4. Run the unit tests, verify they pass

## `Array.reduce()`

1. Open `src/utils/countInArray.js`
2. Implement the function using `reduce` as described
3. Open `src/utils/countInArray.spec.js`
4. Run unit tests and make sure they all pass

## `Object.keys`

1. Open `src/utils/keysMatching.js`
2. Follow instructions to implement method to get keys, filter, and return array
3. Run unit tests `keysMatching`

## fetch

1. Open `src/utsils/getPlayer.js`
2. Follow instructions to implement `getPlayers()` to make an API call
  * Use the `fetch` API
  * Use `await`
3. Run tests in `src/utils/getPlayer.spec.js`

# Discussion points

1. best practices, eslint, airbnb
2. Debugging
3. JSDoc
4. TypeScript
5. MDN

# Homework

1. Open `src/utils/evaluateHand.js`
2. Review what it does--it's fully implemented (but buggy)
3. Open `src/utils/evaluateHands.spec.js`
4. Implement unit tests to handle all edge cases of `evaluateHand`
5. Identify and debug the errors in `evaluateHand`

