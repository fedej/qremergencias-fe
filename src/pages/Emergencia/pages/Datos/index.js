import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { TextField, RaisedButton } from 'material-ui';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import classnames from 'classnames';
import SweetAlert from 'sweetalert-react';

import 'sweetalert/dist/sweetalert.css';

import Home from '../../../Home';
import PacienteService from '../../../../utils/api/Paciente';

class DatosEmergencia extends React.Component {
  static propTypes = {
    isMedico: PropTypes.bool.isRequired,
    params: PropTypes.shape({
      pacienteId: PropTypes.string,
    }).isRequired,
  }

  state = {
    error: '',
    showError: false,
    dato: '',
  }

  componentWillMount() {
    const { pacienteId } = this.props.params;
    PacienteService
      .getDatosEmergencia(pacienteId)
      .then(() => {})
      .catch(error => this.setState({ error, showError: true }));
  }

  handleModificarDatos = () => {
    // TODO: validar

    PacienteService
      .modificarDatosEmergencia()
      .then(() => {})
      .catch(error => this.setState({ error, showError: true }));
  }

  render() {
    return (
      <Home>
        <div className={classnames('formCenter')}>
          <Card style={{ margin: '20px' }}>
            <CardTitle
              title="Datos de Emergencia"
              subtitle="Necesitamos que ingreses el codigo de acceso para modificar los datos del paciente"
            />
            <CardText>
              <TextField
                value={this.state.dato}
                onChange={(e, dato) => this.setState({ dato })}
                errorText={this.state.datoError}
                hintText="Dato"
                type="text"
                floatingLabelText="Dato"
                fullWidth
              />
            </CardText>
            <CardActions style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
              {
                this.props.isMedico && (
                  <RaisedButton
                    label="Modificar"
                    onTouchTap={this.handleModificarDatos}
                    primary
                  />
                )
              }
              <RaisedButton
                label="Volver"
                onTouchTap={() => browserHistory.goBack()}
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

function mapStateToProps(state) {
  return {
    isMedico: state.auth.isMedico,
  };
}

export default connect(mapStateToProps)(DatosEmergencia);
