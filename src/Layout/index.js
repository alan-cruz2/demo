import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import LayoutView from './LayoutView';

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LayoutView));
