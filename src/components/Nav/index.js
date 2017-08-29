import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';

// import styles from './styles.css';
import { toggleDrawer } from '../../store/Drawer';


class NavComponent extends Component {
  static propTypes = {
    title: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
  }

  static defaultProps = {
    title: 'QR Emergencias',
  }

  handleToggleDrawer = () => {
    const { dispatch } = this.props;
    dispatch(toggleDrawer());
  }

  render() {
    const { title } = this.props;

    return (
      <AppBar
        title={title}
        iconClassNameRight="muidocs-icon-navigation-expand-more"
        onLeftIconButtonTouchTap={this.handleToggleDrawer}
      />
    );
  }
}

export default connect()(NavComponent);
