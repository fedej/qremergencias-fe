import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';

import { setRedirectUrl } from '../../store/Navigation';

class EnsureLoggedIn extends React.Component {
  static propTypes = {
    currentURL: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
  }

  componentWillMount() {
    const { dispatch, currentURL, isLoggedIn } = this.props;

    if (!isLoggedIn) {
      dispatch(setRedirectUrl(currentURL));
      browserHistory.replace('/login');
    }
  }

  render() {
    const { isLoggedIn } = this.props;

    if (isLoggedIn) {
      return this.props.children;
    }

    return null;
  }
}

function mapStateToProps(state, ownProps) {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    currentURL: ownProps.location.pathname,
  };
}

export default connect(mapStateToProps)(EnsureLoggedIn);
