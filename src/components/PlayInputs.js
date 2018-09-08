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


const PlayInputs = ({canDo, controller}) =>
  <div className="player-input">

    <button disabled={(canDo & CAN_START_GAME) === 0}
            onClick={controller.startNewGame}
            type="button">
      Start game
    </button>

    <button disabled={(canDo & CAN_START_HAND) === 0}
            onClick={controller.startNewHand}
            type="button">
      Start hand
    </button>

    <button disabled={(canDo & CAN_DEAL_CARD) === 0}
            onClick={controller.dealNextCommunityCard}
            type="button">
      Deal card
    </button>

    <button disabled={(canDo & CAN_CHECK) === 0}
            onClick={controller.betCheck}
            type="button">
      Check
    </button>

    <button disabled={(canDo & CAN_CALL) === 0}
            onClick={controller.betCall}
            type="button">
      Call
    </button>

    <button disabled={(canDo & CAN_RAISE) === 0}
            onClick={controller.betRaise}
            type="button">
      Raise
    </button>

    <button disabled={(canDo & CAN_ALL_IN) === 0}
            onClick={controller.betAllIn}
            type="button">
      All-in
    </button>

    <button disabled={(canDo & CAN_FOLD) === 0}
            onClick={controller.betFold}
            type="button">
      Fold
    </button>

    <button disabled={(canDo & CAN_EVALUATE) === 0}
            onClick={controller.evaluateHands}
            type="button">
      Evaluate
    </button>
  </div>;

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
