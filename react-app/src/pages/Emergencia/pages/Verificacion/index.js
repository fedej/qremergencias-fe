import React from 'react';
import { browserHistory } from 'react-router';
import { TextField, RaisedButton } from 'material-ui';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import classnames from 'classnames';
import SweetAlert from 'sweetalert-react';

import 'sweetalert/dist/sweetalert.css';

import Home from '../../../Home';
import PacienteService from '../../../../utils/api/Paciente';

class Verificacion extends React.Component {
  state = {
    token: '',
    error: '',
    showError: false,
  }

  handleVerificarPaciente = () => {
    if (this.state.token === '') {
      this.setState({ error: 'Ingrese el código de verificación', showError: true });
    } else {
      PacienteService
        .verificar(this.state.token)
        .then(pacienteId => browserHistory.push(`/datos/${pacienteId}`))
        .catch(error => this.setState({ error, showError: true }));
    }
  }

  render() {
    return (
      <Home>
        <div className={classnames('formCenter')}>
          <Card style={{ margin: '20px' }}>
            <CardTitle
              title="Verificar paciente"
              subtitle="Necesitamos que ingreses el codigo de acceso para modificar los datos del paciente"
            />
            <CardText>
              <TextField
                value={this.state.token}
                onChange={(e, token) => this.setState({ token })}
                errorText={this.state.nameError}
                hintText="Ingresa el código"
                type="text"
                floatingLabelText="Código"
                fullWidth
              />
            </CardText>
            <CardActions style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
              <RaisedButton
                label="Verificar"
                onTouchTap={this.handleVerificarPaciente}
                primary
              />
              <RaisedButton
                label="Volver"
                onTouchTap={() => browserHistory.push('/home')} // TODO: volver a ruta anterior
                primary
              />
            </CardActions>
          </Card>
          <SweetAlert
            show={this.state.showError}
            title="Error al validar el código"
            text={this.state.error}
            onConfirm={() => this.setState({ showError: false })}
          />
        </div>
      </Home>
    );
  }
}


export default Verificacion;
