import React from 'react';
import { browserHistory } from 'react-router';
import { TextField, RaisedButton, FlatButton } from 'material-ui';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';
import classnames from 'classnames';

import './styles.css';

export default class Register extends React.Component {
  state = {
    esMedico: false,
  }

  componentWillMount() {
    const esMedico = window.location.href.split('?').pop() === 'medico';
    this.setState({ esMedico });
  }

  handleRegister = () => {
    console.log('register');
  }

  handleToggleTipoCuenta = (event, esMedico) => this.setState({ esMedico });

  render() {
    return (
      <div className={classnames('homeBackground', 'formCenter')}>
        <Card>
          <CardTitle title="Registrarse" />
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
          <CardText>
            <Toggle
              toggled={this.state.esMedico}
              onToggle={this.handleToggleTipoCuenta}
              labelPosition="right"
              label="Soy médico"
            />
          </CardText>
          <CardActions style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
            <RaisedButton
              label="Registrarse"
              onTouchTap={this.handleRegister}
              primary
              fullWidth
            />
            <FlatButton
              label="Loguearse"
              onTouchTap={() => browserHistory.push('/login')}
              fullWidth
            />
          </CardActions>
        </Card>
      </div>
    );
  }
}
