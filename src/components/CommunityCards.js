import React from 'react';
import { connect } from 'react-redux';
import CardStack from './CardStack';
import mapDispatchToPropsCommon from '../redux/mapDispatchToPropsCommon';
import { GAME_STAGE_NEW_HAND } from '../utils/constants';

const CommunityCards = ({ communityCards, gameStage }) =>
  gameStage === GAME_STAGE_NEW_HAND
    ? null
    :
      <CardStack cards={communityCards}
                 className="community flat" />;

function mapStateToProps(state) {
  const {
    communityCards,
    gameStage
  } = state;
  return {
    communityCards,
    gameStage
  };
}

export default connect(mapStateToProps, mapDispatchToPropsCommon)(CommunityCards);
