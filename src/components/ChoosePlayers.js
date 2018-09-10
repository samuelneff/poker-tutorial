import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { playerAdd, playerNameUpdate } from '../redux/actions';

/*
    Tutorial: Hook it up

      Now we want to modify our ChoosePlayers component to use Redux and
      global state.

      I've already removed the previous code that used local state to track
      players and now you'll use the Redux store and actions to do the same
      using global state.

      All interaction between React components and Redux is through props passed
      into the component. Redux is going to send us what we want from the global
      state as well as action creators to call for dispatching actions. We'll
      get to how at the end of this file.
 */

class ChoosePlayers extends Component {
  constructor(props) {
    super(props);
    this.startGame = this.startGame.bind(this);
  }

  /*
        Tutorial: startGame

        Here I've already completed the changes needed for the startGame method.

        It pulls out `actions` which is provided from Redux and `history` from the
        router and uses those to start the game and then redirect.
   */
  startGame() {
    const {
      actions,
      history
    } = this.props;

    actions.gameStart();
    history.push('/game');
  }


  render() {

    /*
          Tutorial: Wire up render()

          The render method is mostly as we left it at the end of the last tutorial.

          You'll need to deconstruct the `players` array and `actions` from props and then
          fill in the event handlers to directly call into the actions.
     */

    return (
      <div>
        <button type="button"
                disabled={players.length >= 6 }
                onClick={}>
          Add Player
        </button>
        {
          players.map(
            player => (
              <div key={player.playerIndex}>
                Player {player.playerIndex + 1}
                <input type="text"
                       value={player.playerName}
                       onChange={} />
              </div>
            )
          )
        }
        <button type="button"
                disabled={players.length < 2}
                onClick={this.startGame}>
          Start Game
        </button>
      </div>
    );
  }
}


/*

      Tutorial: Redux magic

Redux uses two functions that you create to tell Redux
      which data from the global state and which actions it should pass into
      the component.

      mapStateToProps takes a single argument, the root global state, and outputs
      an object that extracts subsets of the state. It's important to extract only
      what is needed as the component will re-render whenever the subset contents
      change and you don't want it to render more than necessary.

      mapDispatchToProps takes a single argument, the dispatch function, and
      returns an object with functions that dispatch the actions. Each is a function
      that wraps the call to the action with the code Redux needs to process it.

      A common convention for mapDispatchToProps is to always bind all of the actions
      with a single key `actions`.

 */


function mapStateToProps(state) {

  /*
        Tutorial: Fill in the data needed from state

        Remember state matches the structure defined in initialState

   */
  return {

  };
}

function mapDispatchToProps(dispatch) {

  /*
        Tutorial: Dispatch actions

        dispatch is a function. Given one of the actions created by our action
        creators, it will propagate it through Redux.

        Remember we created a playerAdd() function that returns a plain object.

        Propagate that through Redux with dispatch(playerAdd()).

        Fill in the rest of this function to return an object with a single key
        `actions` and three functions that wrap the previously created playerAdd()
        and playerNameUpdate() functions as well as gameStart() from actions.js.

   */
  return {

  };
}



/*
      Tutorial:  connect

      Redux ties the mapStateToProps and mapDispatchToProps functions to our
      React component with a higher-level component. This is a function that takes
      one component, and returns a new component that wraps it.

      The function connect() takes  the two mapping functions as arguments and
      returns a new function. Call that function with the React component and
      it returns the connected component that can be used as the original but now
      will have the props from Redux provided.
 */
const connector = connect(mapStateToProps, mapDispatchToProps);
const connected = connector(ChoosePlayers);


/*
      FYI: withRouter

      Normally we would export the `connected` component as our default export and be
      done with it.

      In our case, we also need to interact with the router so after the players
      are chosen, we can redirect to the game view.

      This is done with another higher order component, withRouter() that
      provides another prop called `history` that provides access to browser
      history and function to redirect the user.
 */

export default withRouter(connected);





