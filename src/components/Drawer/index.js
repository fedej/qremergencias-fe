import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Drawer, MenuItem } from 'material-ui';

import { setDrawer } from '../../store/Drawer';
import { logOut } from '../../store/Auth';

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
        open={this.state.open}
        docked={false}
        onRequestChange={this.handleRequestChange}
      >
        <MenuItem onTouchTap={() => this.handleChangeRoute('/perfil')}>
          Perfil
        </MenuItem>
        {
          this.props.isMedico ? (
          [
            <MenuItem
              key="verificacion"
              onTouchTap={() => this.handleChangeRoute('/verificacion')}
            >
              Editar Paciente
            </MenuItem>,
          ]
          ) : (
            [
              <MenuItem
                key="cambios"
                onTouchTap={() => this.handleChangeRoute('/cambios')}
              >
                Cambios Datos de Emergencia
              </MenuItem>,
              <MenuItem
                key="historias"
                onTouchTap={() => this.handleChangeRoute('/historias')}
              >
                Historia Clínica
              </MenuItem>,
              <MenuItem
                key="codigo"
                onTouchTap={() => this.handleChangeRoute('/codigo')}
              >
                Gestionar QR
              </MenuItem>,
            ].map(m => m)
          )
        }
        <MenuItem onTouchTap={this.handleLogout}>
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
