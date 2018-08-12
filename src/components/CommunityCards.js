import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as actions from '../redux/actions';

export class CommunityCards extends Component {

  render() {
    const {
      communityCards
    } = this.props;

    return (
      <div>
        <h1>CommunityCards</h1>
        {
          communityCards.length
            ? <div>None</div>
            : communityCards.map(card => <div>{card.rank}-{card.suit}</div>)
        }
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

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommunityCards)
