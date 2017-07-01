import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';


class EnsureLoggedOut extends React.Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
  }

  componentWillMount() {
    const { isLoggedIn } = this.props;

    if (isLoggedIn) {
      browserHistory.replace('/');
    }
  }

  render() {
    const { isLoggedIn } = this.props;

    if (!isLoggedIn) {
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

export default connect(mapStateToProps)(EnsureLoggedOut);
