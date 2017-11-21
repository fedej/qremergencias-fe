import React from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import NetworkManager, { MESSAGE_ERROR } from '../../utils/api/Network';

import Nav from '../../components/Nav';
import Drawer from '../../components/Drawer';


export default class Home extends React.Component {
  static propTypes = {
    children: PropTypes.element,
  }

  static defaultProps = {
    children: null,
  }

  static offlineChecker;

  state = {
    toastIsVisible: false,
  }

  componentWillMount() {
    this.offlineChecker = setInterval(() => {
      NetworkManager
        .isOnline()
        .then((isOnline) => {
          if (!isOnline) {
            this.showNetworkError();
          }
        })
        .catch(() => this.showNetworkError());
    }, 30 * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.offlineChecker);
  }

  showNetworkError = () => {
    if (!this.state.toastIsVisible) {
      toast.error(MESSAGE_ERROR, {
        onClose: () => this.setState({ toastIsVisible: false }),
      });
      this.setState({ toastIsVisible: true });
    }
  }

  render() {
    const { navElementRight } = this.props;
    return (
      <div>
        <Nav elementRight={navElementRight} />
        <Drawer />
        <ToastContainer
          style={{ zIndex: '900' }}
          position="bottom-right"
          autoClose={false}
          type="error"
        />
        <div style={{ marginTop: '1.5em' }}>{this.props.children}</div>
      </div>
    );
  }
}
