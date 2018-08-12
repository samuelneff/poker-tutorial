import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import CardStack from './CardStack';

import mapDispatchToPropsCommon from '../redux/mapDispatchToPropsCommon';

export class CommunityCards extends Component {

  render() {
    const {
      communityCards
    } = this.props;

    return (
      <div>
        <div>CommunityCards</div>
        <div className="interim-data"><CardStack cards={communityCards} /></div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {
    communityCards
  } = state;
  return {
    communityCards
  };
}

export default connect(mapStateToProps, mapDispatchToPropsCommon)(CommunityCards)
