import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import * as actions from '../redux/actions';

/* *******************************************************************

    TUTORIAL


    1. We're going to create a form to enter the number of players, their names, and then
       start the game.

    2. Start by adding a render method with a `<div>` container and a heading `<h1>`.
       Refer to the previous file for reference if needed.

    3. Now we're going to need component state to store the players. Initialize the state
       in the constructor.

    4. Create a new method to add a new player, `addPlayer()`. We always treat state as immutable so
       you want to always create a new array referencing the existing players and
       adding in the new player and then using `setState` to store the new array as the
       players array in state.

        const newPlayers = [
          ...players,
          {
            playerIndex: players.length,
            playerName: '',
            playerBank: 1000
          }
        ];

    5. Add a button to add a player.

        <button type="button"
                onClick={this.addPlayer}>
          Add Player
        </button>

    6. Add binding for the addPlayer method in the constructor

        this.addPlayer = this.addPlayer.bind(this);

    7. Now we have to actually display the players. To display a list of things from an
       array use the `.map()` method to convert each item in the array to a JSX component.

        players.map(player => <div />)

    8. In React when creating an array the top-level element must have a `key` attribute

        key={player.playerIndex}

    9. Show the number of each player (remember index is zero based)

        Player { player.playerIndex + 1 }

    10. Add an input to update the player. Use the `onChange` attribute to call a method
        when the value changes. The method gets an event argument and you'll also need
        the current player, so pass that along as well with an arrow function.

        <input type="text"
               value={player.playerName}
               onChange={event => this.updatePlayerName(event, player)} />

    11. Now implement the `updatePlayerName` method. Remember you will need to
        update the state with a new `players` array without modifying the original.

        There are a few to make a shallow copy of an array. You can use destructuring:

          const newArray = [...players];

        or the concat method (which normally is used to put to arrays together)

          const newArray = players.concat();

        or using the slice method (which usually copies some subset of an array)

          const newArray = players.slice();

    13. Test it out by navigating to the players page

          http://localhost:3000/players

    14. Add logic to prevent users from adding more than 6 players.

          <button disabled={ expression } />

    12. Finally we want to add another button and method to start the game (and remember
        the constructor binding). Disable the button if less than two players.

          startGame() {
            const {
              actions: {
                gameStart,
                playerAdd
              },
              history
            } = this.props;
            const { players } = this.state;

            players.forEach(playerAdd);
            gameStart();
            history.push('/game');
          }


 */
class ChoosePlayers extends Component {

}







function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChoosePlayers));
