import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';

class EnsureSession extends React.Component {
  static propTypes = {
    redirectURL: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
  }

  componentWillUpdate(prevProps) {
    const { redirectURL } = this.props;
    const isLoggingOut = prevProps.isLoggedIn && !this.props.isLoggedIn;
    const isLoggingIn = !prevProps.isLoggedIn && this.props.isLoggedIn;

    if (isLoggingIn) {
      // dispatch(navigateTo(redirectURL));
      browserHistory.push(redirectURL);
    } else if (isLoggingOut) {
      // do any kind of cleanup or post-logout redirection here
    }
  }

  render() {
    return this.props.children;
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    redirectURL: state.navigation.redirectURL,
  };
}

export default connect(mapStateToProps)(EnsureSession);
