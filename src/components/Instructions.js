import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';

export default class Instructions extends Component {
  constructor(props) {
    super(props);
    this.state = {expanded: false};
    this.toggleState = this.toggleState.bind(this);
  }

  toggleState() {
    const {expanded} = this.state;
    this.setState({expanded: !expanded});
  }

  render() {
    const {expanded} = this.state;
    return (
      <div>
        <h1>Texas Hold'em</h1>
        <p>
          Texas Hold ‘Em, also known as just plain “Holdem,” is a popular variation of standard poker.
          Meant for two to nine players, Holdem dates back to the early 1900s and can be enjoyed in
          person or online. Here, we take a quick look at the history of Texas Hold ‘Em, plus we
          explore the game itself and provide some valuable tips for improving your odds of winning
          at Holdem. Once you’ve learned the Texas Hold ‘em rules, you can start playing by clicking here.
        </p>
        <a onClick={this.toggleState}>
          {expanded ? 'Show' : 'Hide'} Instructions
        </a>
        {
          expanded &&
          <Fragment>
            <h2>Step One</h2>
            <p>Blinds, or bets are placed. One player places the “small blind,” while the other places the “big blind.”
              These bets are compulsory for two of the players; additional players play for free. To make it fair,
              different
              players must post the blinds during each round.</p>

            <h2>Step Two</h2>
            <p> Each player of Texas Hold ‘em receives two cards in the Preflop Round, which are referred to as the
              “starting hand” or hole cards. After all players have received their hole cards, each player in succession
              decides whether to continue playing or not, starting with the player to the right of the person who placed
              the
              big blind. If you have good, playable cards, you can “call the blind,” by putting in the same amount of
              money
              as the big blind; alternately, you can “raise” by putting in more money than is in the big blind. If your
              cards are undesirable, you “muck” or “fold,” meaning you throw your hand away. Each player has similar
              options, calling, raising, or folding in turn. Once everyone has contributed the same amount of money or
              folded, the chips are moved to the center of the table, and the second round, also known as the “flop round”
              begins.
            </p>
            <h2>Step Three</h2>
            <p>In the flop round of Texas Hold ‘em, the dealer places three cards face-up on the table. Another round of
              betting ensues, and you decide if your hole cards and the “community” cards are sufficient to make a winning
              hand. Each active player uses his or her private cards and the three community cards to form a five-card
              poker
              hand. The small blind player takes action first. He or she has the option to “check” or not bet anything, or
              “bet” by putting money in the middle, which others will have to match to stay in the game. The final option
              is
              to throw the cards away by folding. The big blind player goes next, “calling” the small blind players bet by
              placing an equal amount of money on the table, “raising” by placing an additional amount of money on the
              table, or by folding. Each player takes a turn, calling, raising, or folding. Once everyone has placed the
              same amount of money on the table, it’s time for the “turn” round.</p>

            <h2>Step Four</h2>
            <p>At the beginning of the turn round, the dealer adds another card to the table, making a total of six cards
              available to you. This card represents an additional opportunity to make the best possible poker hand, and
              you
              can use any five of the six cards to form your final five-card hand. The betting is conducted in the same
              manner as it was during the flop round. Once everyone has folded or placed the same amount of money in the
              pot, it’s time for the final or “river” round.</p>

            <h2>Step Five</h2>
            <p>During the river round of Texas Hold ‘em, an additional card is dealt face-up on the table. This card
              represents your final opportunity to make the best poker hand possible, and you can use any five of the
              seven
              cards to form your final five-card hand. The fourth round is played in the same way as the previous
              rounds.</p>

            <h2>Step Six</h2>
            <p>After the betting concludes, it’s time for the showdown. All players show their hands, and the dealer
              determines who has won, then awards the pot accordingly. It’s a winner-takes-all game. One of the basic
              rules
              of Texas Hold ‘Em is that it is a game for two or more players. Your odds of winning vary by number of
              players, and game play becomes more challenging as more players are added.</p>
          </Fragment>
        }
        <Link to="/">Home</Link>
      </div>
    );
  }
}
