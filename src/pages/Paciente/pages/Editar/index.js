/* eslint-disable react/prefer-stateless-function */
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

  render() {
    return (
      <Home>
        <div className={classnames('formCenter')}>
          <Card style={{ margin: '20px' }}>
            <CardTitle
              title="Editar Paciente"
            />
            <CardActions style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
              <RaisedButton
                style={{ marginTop: '1vh' }}
                label="Editar Datos de Emergencia"
                onTouchTap={() => browserHistory.push('/datos')}
                primary
              />
              <RaisedButton
                style={{ marginTop: '1vh' }}
                label="Ver Historia Clinica"
                onTouchTap={() => browserHistory.push('/historiasPaciente')}
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
                onTouchTap={() => browserHistory.goBack()}
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
