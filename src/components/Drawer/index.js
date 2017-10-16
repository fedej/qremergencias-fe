import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Drawer, MenuItem } from 'material-ui';
import Divider from 'material-ui/Divider';

import { setDrawer } from '../../store/Drawer';
import { logOut } from '../../store/Auth';

const iconMenuProfile = require('../../assets/icons/profile_menu.png');
const iconMenuQR = require('../../assets/icons/qr_menu.png');
const iconMenuEmergencyData = require('../../assets/icons/emergency_data_menu.png');
const iconMenuRecords = require('../../assets/icons/records_menu.png');
const iconMenuEdit = require('../../assets/icons/edit_menu.png');
const iconMenuChanges = require('../../assets/icons/changes_menu.png');
const iconMenuLogout = require('../../assets/icons/logout_menu.png');

class DrawerComponent extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    isMedico: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  state = {
    open: false,
  }

  componentWillReceiveProps(nextProps) {
    const { isOpen } = nextProps;
    this.setState({ open: isOpen });
  }

  handleRequestChange = (open) => {
    const { dispatch } = this.props;
    dispatch(setDrawer(open));
  }

  handleChangeRoute = (route) => {
    const { dispatch } = this.props;
    browserHistory.push(route);
    dispatch(setDrawer(false));
  }

  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(setDrawer(false));
    dispatch(logOut());
  }

  render() {
    return (
      <Drawer
        width={315}
        open={this.state.open}
        docked={false}
        onRequestChange={this.handleRequestChange}
      >
        <MenuItem
          leftIcon={<img alt="" src={iconMenuProfile} />}
          onTouchTap={() => this.handleChangeRoute('/perfil')}
        >
          Perfil
        </MenuItem>
        {
          this.props.isMedico ? (
          [
            <MenuItem
              leftIcon={<img alt="" src={iconMenuEdit} />}
              key="verificacion"
              onTouchTap={() => this.handleChangeRoute('/verificacion')}
            >
              Editar Paciente
            </MenuItem>,
          ]
          ) : (
            [
              <MenuItem
                leftIcon={<img alt="" src={iconMenuQR} />}
                key="codigo"
                onTouchTap={() => this.handleChangeRoute('/codigo')}
              >
                Gestionar QR
              </MenuItem>,
              <MenuItem
                leftIcon={<img alt="" src={iconMenuRecords} />}
                key="historias"
                onTouchTap={() => this.handleChangeRoute('/historias')}
              >
                Historia Clínica
              </MenuItem>,
              <MenuItem
                leftIcon={<img alt="" src={iconMenuEmergencyData} />}
                key="datos"
                onTouchTap={() => this.handleChangeRoute('/datosEmergencia')}
              >
                Datos de Emergencia
              </MenuItem>,
              <MenuItem
                leftIcon={<img alt="" src={iconMenuChanges} />}
                key="cambios"
                onTouchTap={() => this.handleChangeRoute('/cambios')}
              >
                Historial de cambios
              </MenuItem>,
            ].map(m => m)
          )
        }
        <Divider />
        <MenuItem
          leftIcon={<img alt="" src={iconMenuLogout} />}
          onTouchTap={this.handleLogout}
        >
          Cerrar Sesión
        </MenuItem>
      </Drawer>
    );
  }
}

export default connect(state => ({
  isOpen: state.drawer.isOpen,
  isMedico: state.auth.isMedico,
}))(DrawerComponent);
