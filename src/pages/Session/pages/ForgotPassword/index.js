import React from 'react';
import { browserHistory } from 'react-router';
import { TextField, RaisedButton, FlatButton, Dialog } from 'material-ui';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import classnames from 'classnames';

import UserService from '../../../../utils/api/User';
import { isValidEmail } from '../../../../utils/validations';
import '../../styles.css';


export default class ForgotPassword extends React.Component {

  state = {
    email: '',
    emailError: '',
    modalOpen: false,
    error: '',
  }

  handleForgotPassword = () => {
    const { email } = this.state;

    if (isValidEmail(email)) {
      const data = {
        gRecaptchaResponse: 'HACK',
        username: email,
      };

      UserService.restorePassword(data)
        .then(() => browserHistory.push('/forgotPasswordSuccess'))
        .catch((err) => {
          this.setState({
            modalOpen: true,
            error: err.message,
          });
        });
    } else {
      this.setState({ emailError: 'Ingrese un email válido' });
    }
  }

  handleClose = () => {
    this.setState({ modalOpen: false });
  }

  render() {
    const actions = [
      <FlatButton
        label="Ok"
        primary
        onTouchTap={this.handleClose}
      />,
    ];

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
              errorText={this.state.emailError}
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
                onTouchTap={() => browserHistory.goBack()}
              />
            </div>
          </CardActions>
        </Card>
        <Dialog
          title="Error"
          actions={actions}
          modal={false}
          open={this.state.modalOpen}
          onRequestClose={this.handleClose}
        >
          {this.state.error}
        </Dialog>
      </div>
    );
  }
}
