import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { RaisedButton } from 'material-ui';
import { Card, CardActions, CardTitle } from 'material-ui/Card';
import classnames from 'classnames';

import Home from '../../../Home';

class EditarPaciente extends React.Component {
  static propTypes = {
    isMedico: PropTypes.bool.isRequired,
    params: PropTypes.shape({
      pacienteId: PropTypes.string,
    }).isRequired,
  }

  state = {

  }

  componentWillMount() {
    // TODO: traer state paciente que se esta editando
  }

  handleModificarDatos = () => {
    console.log('handleModificarDatos');
  }

  handleViewHistoriasClinicas = () => {
    console.log('handleViewHistoriasClinicas');
  }

  render() {
    return (
      <Home>
        <div className={classnames('formCenter')}>
          <Card style={{ margin: '20px' }}>
            <CardTitle
              title="Editar Paciente"
              subtitle="Fede Jaite"
            />
            <CardActions style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
              <RaisedButton
                style={{ marginTop: '1vh' }}
                label="Editar Datos de Emergencia"
                // TODO: goto Datos de Emergencia
                onTouchTap={this.handleModificarDatos}
                primary
              />
              <RaisedButton
                style={{ marginTop: '1vh' }}
                label="Ver Historia Clinica"
                onTouchTap={this.handleViewHistoriasClinicas}
                primary
              />
              <RaisedButton
                style={{ marginTop: '1vh' }}
                label="Cargar Historia Clinica"
                onTouchTap={() => browserHistory.push('/carga')}
                primary
              />
              <RaisedButton
                style={{ marginTop: '1vh' }}
                label="Volver"
                onTouchTap={() => browserHistory.push('/home')}
              />
            </CardActions>
          </Card>
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

export default connect(mapStateToProps)(EditarPaciente);
