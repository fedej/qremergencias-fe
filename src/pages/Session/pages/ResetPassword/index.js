import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { TextField, RaisedButton, Dialog, FlatButton } from 'material-ui';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import classnames from 'classnames';

import UserService from '../../../../utils/api/User';
import '../../styles.css';

class ResetPassword extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  state = {
    dialogOpen: false,
    password: '',
    confirmPassword: '',
    passwordError: '',
  }

  handleResetPassword = () => {
    const { password, confirmPassword } = this.state;

    const token = new URLSearchParams(window.location.search).get('token');

    if (password === confirmPassword) {
      const data = { newPassword: password, confirmPassword, token: token, "recaptchaResponse": "HACK" };
      UserService.resetPassword(data)
         .then(() => {
           this.setState({ dialogOpen: true });
         })
         .catch(err => this.setState({ passwordError: 'Error al cambiar contraseña' }))
    } else {
      this.setState({ passwordError: 'Las contraseñas no coinciden' });
    }
  }

  handleConfirmReset = () => {
    this.setState({ dialogOpen: false }, () => {
      setTimeout(() => {
        browserHistory.push('/login');
      }, 1000);
    });
  }

  render() {
    const actions = [
      <FlatButton
        label="Ok"
        primary
        onTouchTap={this.handleConfirmReset}
      />,
    ];

    return (
      <div className={classnames('homeBackground', 'formCenter')}>
        <Card>
          <CardTitle
            title="Restablecer contraseña"
            subtitle="Ingresa tu nueva contraseña"
          />
          <CardText>
            <TextField
              value={this.state.password}
              onChange={(e, password) => this.setState({ password })}
              hintText="Nueva Contraseña"
              errorText={this.state.passwordError}
              type="password"
              floatingLabelText="Contraseña"
              fullWidth
            />
            <TextField
              value={this.state.confirmPassword}
              onChange={(e, confirmPassword) => this.setState({ confirmPassword })}
              hintText="Confirmar Contraseña"
              type="password"
              floatingLabelText="Contraseña"
              fullWidth
            />
          </CardText>
          <CardActions
            style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}
          >
            <RaisedButton
              label="Restablecer"
              onTouchTap={this.handleResetPassword}
              primary
              fullWidth
            />
          </CardActions>

          <Dialog
            title="Contraseña restablecida"
            actions={actions}
            modal={false}
            open={this.state.dialogOpen}
            onRequestClose={this.handleConfirmReset}
          >
            Inicia sesión con tu nueva contraseña
          </Dialog>
        </Card>
      </div>
    );
  }
}

export default connect()(ResetPassword);
