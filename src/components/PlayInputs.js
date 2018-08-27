import React from 'react';
import { connect } from 'react-redux';
import controllerRef from '../redux/controller';
import {
  CAN_START_GAME,
  CAN_START_HAND,
  CAN_DEAL_CARD,
  CAN_CHECK,
  CAN_CALL,
  CAN_RAISE,
  CAN_ALL_IN,
  CAN_FOLD,
  CAN_EVALUATE,
} from '../utils/constants';


/* ****************************************************************

    TUTORIAL

    Now we're going to create a component to display buttons to control the game.
    Since this is a simple component that only needs to display JSX based on its
    props, we don't need a full component. Instead we can just create a function
    that accepts the two props and returns JSX.

    1. Create a function to represent the component. It must be pascal case and
       accept a single argument, its props. It's common to deconstruct the props
       inside the argument.

        const PlayInputs = ({canDo, controller}) =>

    2. Add a single `<div>` to contain all the buttons. Add a class `player-inputs`
       so it picks up the styles that have been defined in global css.

       <div className="player-input">

    3. Add a button for each action. The `controller` prop has methods for each
       available action and the `canDo` prop is a bitwise value that defines which
       actions are currently available based on the status of the game.

       Example:

          <button disabled={(canDo & CAN_START_GAME) === 0}
                  onClick={controller.startNewGame}
                  type="button">

       Controller has these methods available:

          startNewGame
          startNewHand
          dealNextCommunityCard
          evaluateHands
          betCheck
          betCall
          betRaise
          betAllIn
          betFold

       And they all have a CAN_XYZ constant already imported.

    4. Play poker!

 */



const PlayInputs = () => null;














const mapStateToProps = state => {
  return {
    canDo: controllerRef.getAvailableActions(),
    controller: controllerRef
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayInputs);
