import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

/* ************************************************

  Tutorial

  1. Open the instructions page in a browser
     http://localhost:3000/instructions

  2. Arrange the IDE and browser window so you can see both side-by-side

  3. Use a <p> tag to add an introductory paragraph below the Instructions

      Texas Hold ‘Em, also known as just plain “Holdem,” is a popular variation of standard poker.
      Meant for two to nine players, Holdem dates back to the early 1900s and can be enjoyed in
      person or online. Here, we take a quick look at the history of Texas Hold ‘Em, plus we
      explore the game itself and provide some valuable tips for improving your odds of winning
      at Holdem. Once you’ve learned the Texas Hold ‘em rules, you can start playing by clicking here.

  4. Notice how the browser updates without needing to refresh.

  5. Use <h2> and <p> tags to add rules below the introduction.

      Step One
      Blinds, or bets are placed. One player places the “small blind,” while the other places the “big blind.” These bets are compulsory for two of the players; additional players play for free. To make it fair, different players must post the blinds during each round.

      Step Two
      Each player of Texas Hold ‘em receives two cards in the Preflop Round, which are referred to as the “starting hand” or hole cards. After all players have received their hole cards, each player in succession decides whether to continue playing or not, starting with the player to the right of the person who placed the big blind. If you have good, playable cards, you can “call the blind,” by putting in the same amount of money as the big blind; alternately, you can “raise” by putting in more money than is in the big blind. If your cards are undesirable, you “muck” or “fold,” meaning you throw your hand away. Each player has similar options, calling, raising, or folding in turn. Once everyone has contributed the same amount of money or folded, the chips are moved to the center of the table, and the second round, also known as the “flop round” begins.

      Step Three
      In the flop round of Texas Hold ‘em, the dealer places three cards face-up on the table. Another round of betting ensues, and you decide if your hole cards and the “community” cards are sufficient to make a winning hand. Each active player uses his or her private cards and the three community cards to form a five-card poker hand. The small blind player takes action first. He or she has the option to “check” or not bet anything, or “bet” by putting money in the middle, which others will have to match to stay in the game. The final option is to throw the cards away by folding. The big blind player goes next, “calling” the small blind players bet by placing an equal amount of money on the table, “raising” by placing an additional amount of money on the table, or by folding. Each player takes a turn, calling, raising, or folding. Once everyone has placed the same amount of money on the table, it’s time for the “turn” round.

      Step Four
      At the beginning of the turn round, the dealer adds another card to the table, making a total of six cards available to you. This card represents an additional opportunity to make the best possible poker hand, and you can use any five of the six cards to form your final five-card hand. The betting is conducted in the same manner as it was during the flop round. Once everyone has folded or placed the same amount of money in the pot, it’s time for the final or “river” round.

      Step Five
      During the river round of Texas Hold ‘em, an additional card is dealt face-up on the table. This card represents your final opportunity to make the best poker hand possible, and you can use any five of the seven cards to form your final five-card hand. The fourth round is played in the same way as the previous rounds.

      Step Six
      After the betting concludes, it’s time for the showdown. All players show their hands, and the dealer determines who has won, then awards the pot accordingly. It’s a winner-takes-all game. One of the basic rules of Texas Hold ‘Em is that it is a game for two or more players. Your odds of winning vary by number of players, and game play becomes more challenging as more players are added.

  6. Notice the automatic updates again.

  7. Now we want to add a link to show/hide the instructions. The open/close variable in React is
     referred to as `state`. When using state we initialize it as an object in the constructor
     and then use the method `setState()` when we need to update it later. React automatically
     re-renders whenever state changes.

  8. We'll want to keep an `expanded` variable in state so add this to the constructor.

      this.state = { expanded: false };

  9. This means by default we will not show the instructions.

  10. Deconstruct the `expanded` variable inside `render()`, before `return`.

      const { expanded } = this.state;

  11. We'll want to add a link to control toggling state.

      <a onClick={this.toggleState}>
      </a>

  12. Inside the link we'll want to use differen text depending on current state, *Show More* or
      *Show Less*. You can embed JavaScript within React components using curly brackets and
      choose between two items using the ternary ? :

      { test ? 'true' : 'false' }

  13. Now we need to create the toggleState method. Add this to the class.

      toggleState() {
        const { expanded } = this.state;
        this.setState( { expanded: !expanded } );
      }

  14. Open the console in the browser (F12 or right-click > Inspect > Console)

  15. Click the link.

  16. Listen to `this` discussion.

  17. Two ways to fix.

  18. Change link to use an arrow function.

      () => this.toggleState();

  19. Test and confirm works.

  20. Put link back to what it was an add this to the constructor:

      this.toggleState = this.toggleState.bind(this);

  21.  Add a `<div>` around the instructions (below the toggle link).

  22. Add a conditional to only show instructions when expanded.

  23. Discussion of unnecessary structural components.

  24. Replace `<div>` with `<Fragment>` (closing tag too).

  24. Use `<Link>` tag to create a link home.

      <Link to="/">Home</Link>

 */

export default class Instructions extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Texas Hold'em</h1>
      </div>
    );
  }
}
