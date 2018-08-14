import React from 'react';
import { connect } from 'react-redux';
import CardStack from './CardStack';

import mapDispatchToPropsCommon from '../redux/mapDispatchToPropsCommon';

const CommunityCards = ({ communityCards }) =>
  <div>
    <div>CommunityCards</div>
    <div className="interim-data"><CardStack cards={communityCards} /></div>
  </div>;

function mapStateToProps(state) {
  const {
    communityCards
  } = state;
  return {
    communityCards
  };
}

export default connect(mapStateToProps, mapDispatchToPropsCommon)(CommunityCards);
