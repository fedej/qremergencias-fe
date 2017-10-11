import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { TextField, RaisedButton } from 'material-ui';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import classnames from 'classnames';
import SweetAlert from 'sweetalert-react';

import 'sweetalert/dist/sweetalert.css';

import Home from '../Home';
import { vincularPaciente } from '../../store/Paciente';

class Verificacion extends React.Component {
  static propTypes = {
    error: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    editando: PropTypes.string.isRequired,
  }

  state = {
    token: '',
    error: '',
    showError: false,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error || (this.props.isFetching && nextProps.editando === '')) {
      this.setState({ error: nextProps.error, showError: true });
      return;
    }

    if (this.props.isFetching && !nextProps.isFetching && !nextProps.error) {
      browserHistory.push('/editar');
    }
  }

  handleVerificarPaciente = () => {
    if (this.state.token === '') {
      this.setState({ error: 'Ingrese el código de verificación', showError: true });
    } else {
      const { dispatch } = this.props;
      dispatch(vincularPaciente(this.state.token));
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

function mapStateToProps(state) {
  return {
    error: state.paciente.error,
    isFetching: state.paciente.isFetching,
    editando: state.paciente.editando,
  };
}

export default connect(mapStateToProps)(Verificacion);
