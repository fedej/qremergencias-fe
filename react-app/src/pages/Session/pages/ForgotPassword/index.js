import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { TextField, RaisedButton, FlatButton } from 'material-ui';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import classnames from 'classnames';

import UserService from '../../../../utils/api/User';
import { isValidEmail } from '../../../../utils/validations';
import '../../styles.css';


export default class ForgotPassword extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  state = {
    email: '',
    emailError: '',
  }

  handleForgotPassword = () => {
    const { email } = this.state;

    if (isValidEmail(email)) {

      const data = {
        gRecaptchaResponse: "",
        username: email
      };

      UserService.restorePassword(data)
      .then(() => browserHistory.push('/forgotPasswordSuccess'))
      .catch((err) => {
        // TODO: mostrar error
      });
    } else {
      this.setState({ emailError: 'Ingrese un email válido' });
    }
  }

  render() {
    return (
      <div className={classnames('homeBackground', 'formCenter')}>
        <Card>
          <CardTitle
            title="¿Olvidaste tu contraseña?"
            subtitle="Por favor, ingresá tu email y te informaremos los pasos a seguir"
          />
          <CardText>
            <TextField
              hintText="mi@email.com"
              floatingLabelText="Email"
              onChange={(e, email) => this.setState({ email })}
              fullWidth
            />
          </CardText>
          <CardActions style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
            <RaisedButton
              label="Enviar"
              onTouchTap={this.handleForgotPassword}
              primary
              fullWidth
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '2vh' }}>
              <FlatButton
                label="Volver"
                onTouchTap={() => browserHistory.push('/login')}
              />
            </div>
          </CardActions>
        </Card>
      </div>
    );
  }
}
