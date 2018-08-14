import React from 'react';
import { connect } from 'react-redux';
import mapDispatchToPropsCommon from '../redux/mapDispatchToPropsCommon';


const PotDisplay = ({ pot }) =>
  <div>
    <div>
      Pot
    </div>
    <div className="interim-data">
      Value:
      { ' ' }
      { pot }
    </div>
  </div>;

function mapStateToProps(state) {
  const {
    pot
  } = state;
  return {
    pot
  };
}

export default connect(mapStateToProps, mapDispatchToPropsCommon)(PotDisplay);
