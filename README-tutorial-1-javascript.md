# Tutorial 1: JavaScript

For this tutorial you'll review a number of incomplete functions and unit tests.

# Concepts

The tutorial will review these modern JavaScript concepts:

. `let`, `const`
. functional first, functions and arrow functions
. object and array destructuring, spread 
. everything is asynchronous: callbacks, promises, `asyc`/`await`
. objects, classes, inheritance, object methods
. `for` loops, `forEach`, `filter`, `map`, `every`, `some`, `reduce`, `keys`, `values`, `entries`
. HTTP calls
. best practices, eslint, airbnb
. Debugging
. JSDoc
. TypeScript
. MDN

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

. Scroll to `function shouldReturn13OfEachSuit()` within IDE tab
. Implement the center of the function to count how many card of each suit there are
. Use `forEach` to loop over the deck
. Use `if` / `else` to determine which suit to increment
. Run the the tests, it should pass now

## Chaining `map` and `forEach`

. Scroll to the next test `function shouldReturnFourOfEachRank`
. Use `map()` to convert the card array to an array of ranks
. Use `forEach()` to loop over the ranks
. Use property access and a ternary to assign the right value
. Run the test, it should pass now

## `while` and `Math`

. Scroll to the last test `function shouldBeShuffled`
. This test is fully implemented but fails
. Follow the instructions to create and use a `shuffle` function to shuffle the deck
. Use `while`, `Math.random()` and `Math.trunc()`
. Run the test and iterate the shuffle until it passes

## Object deconstruction and the spread operator

. Open `src/utils/recordPlayerBet.js`
. Follow instructions to implement the function
  * Use object deconstruction to create local variables
  * Use spread operator to create a new return object
. Run tests `src/utils/recordPlayerBet.spec.js`
. If implemented properly, all tests should pass.

## Callbacks, Promises, and `async` / `await`

. Open `src/utils/startGame.js`
. Follow the instructions to implement `startGame()` using callbacks
. Run in terminal to see how it runs with delays
  * `node src/utils/startGame.js`
. Run unit test `startGame.spec.js` to verify timing
. Comment out the implementation you just wrote and re-write using promises
. Verify method still works properly
. Comment out the promises implementation and re-write with `async` and `await`
. Verify method still works properly



# Maybe?

`isFlush` for `every`
`timeout` for `Promise`
