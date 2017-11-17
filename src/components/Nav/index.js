import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import classnames from 'classnames';
import './styles.css';
import { toggleDrawer } from '../../store/Drawer';


const iconMenuProfile = require('../../assets/icons/user-white.png');

class NavComponent extends Component {
  static propTypes = {
    title: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
    username: PropTypes.string,
  }

  static defaultProps = {
    title: 'QR Emergencias',
    username: '',
  }

  handleToggleDrawer = () => {
    const { dispatch } = this.props;
    dispatch(toggleDrawer());
  }

  render() {
    const { title, username, elementRight } = this.props;

    if (elementRight) {
      return (
        <AppBar
          title={title}
          onLeftIconButtonTouchTap={this.handleToggleDrawer}
          iconElementRight={elementRight}
        />
      )
    }

    return (
      <AppBar
        title={title}
        onLeftIconButtonTouchTap={this.handleToggleDrawer}
        iconElementRight={<div><span className={classnames('navBarUser')}>{username}<img alt="" src={iconMenuProfile} /></span></div>}
      />
    );
  }
}

export default connect(state => ({
  username: state.auth.profile.email,
}))(NavComponent);
