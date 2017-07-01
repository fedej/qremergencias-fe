import React from 'react';
import { TextField, RaisedButton } from 'material-ui';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import classnames from 'classnames';

import './styles.css';

export default class ForgotPassword extends React.Component {
  handleRestorePassword = () => {
    console.log('handleRestorePassword');
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
              fullWidth
            />
          </CardText>
          <CardActions style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
            <RaisedButton
              label="Enviar"
              onTouchTap={this.handleRestorePassword}
              primary
              fullWidth
            />
          </CardActions>
        </Card>
      </div>
    );
  }
}
