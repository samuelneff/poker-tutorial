import { bindActionCreators } from 'redux';
import * as actions from './actions';

export default function mapDispatchToPropsCommon(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}
