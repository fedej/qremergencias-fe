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
import { isOnlyNumber, isEmptyString, isValidDNI } from '../../utils/validations';

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
    idNumber: '',
    idNumberError: '',
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
    if (isEmptyString(this.state.idNumber) || !isValidDNI(this.state.idNumber)) {
      this.setState({ tokenError: '', idNumberError: 'El DNI debe ser numérico' });
    } else if (!isOnlyNumber(this.state.token)) {
      this.setState({ idNumberError: '', tokenError: 'Ingrese un código de verificaión válido' });
    } else {
      this.setState({ idNumberError: '', tokenError: '' });
      const { dispatch } = this.props;
      dispatch(vincularPaciente('' + this.state.token + this.state.idNumber));
    }
  }

  render() {
    return (
      <Home>
        <div className={classnames('formCenter')}>
          <Card style={{ margin: '20px' }}>
            <CardTitle
              title="Verificar paciente"
              subtitle="Necesitamos que ingreses el código de acceso para modificar los datos del paciente"
            />
            <CardText>
              <TextField
                value={this.state.idNumber}
                onChange={(e, idNumber) => this.setState({ idNumber })}
                errorText={this.state.idNumberError}
                hintText="Ingresá el DNI del paciente"
                type="text"
                floatingLabelText="DNI"
                fullWidth
              />
              <TextField
                value={this.state.token}
                onChange={(e, token) => this.setState({ token })}
                errorText={this.state.tokenError}
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
    error: state.paciente.error,
    isFetching: state.paciente.isFetching,
    editando: state.paciente.editando,
  };
}

export default connect(mapStateToProps)(Verificacion);
