import React from 'react';
import { browserHistory } from 'react-router';
import { TextField, RaisedButton, FlatButton } from 'material-ui';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import classnames from 'classnames';

import './styles.css';

export default class Login extends React.Component {
  state = {
    esMedico: false,
  }

  handleLogin = () => {
    console.log('login');
  }

  handleToggleTipoCuenta = (event, esMedico) => this.setState({ esMedico });

  render() {
    return (
      <div className={classnames('homeBackground', 'formCenter')}>
        <Card>
          <CardTitle title="Iniciar Sesión" subtitle="Ingrese sus datos" />
          <CardText>
            <TextField
              hintText="mi@email.com"
              floatingLabelText="Email"
              fullWidth
            />
            <TextField
              hintText="tu contraseña"
              floatingLabelText="Contraseña"
              type="password"
              fullWidth
            />
          </CardText>
          <CardActions style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
            <RaisedButton
              label="Loguearse"
              onTouchTap={this.handleLogin}
              primary
              fullWidth
            />
            <FlatButton
              label="Registrarse"
              onTouchTap={() => browserHistory.push('/register')}
              fullWidth
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '2vh' }}>
              <FlatButton
                label="Olvidaste tu contraseña?"
                onTouchTap={() => browserHistory.push('/forgotPassword')}
              />
            </div>
          </CardActions>
        </Card>
      </div>
    );
  }
}
