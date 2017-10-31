import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { TextField, RaisedButton, DatePicker } from 'material-ui';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import classnames from 'classnames';
import moment from 'moment';
import SweetAlert from 'sweetalert-react';

import 'sweetalert/dist/sweetalert.css';
import {
  isValidDNI,
  isEmptyString,
  stringHasNumbers,
  isOnlyString,
} from '../../../../utils/validations';

import { correctDate } from '../../../../utils/dateformat';

import { completeRegistration } from '../../../../store/Auth';
import '../../styles.css';

function validarMayorDeEdad(date) {
  const fecha = moment().utc().subtract(18, 'y');
  return date > fecha;
}

class CompleteRegister extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    auth: PropTypes.shape({
      isFetching: PropTypes.bool.isRequired,
      error: PropTypes.string.isRequired,
    }).isRequired,
  }

  state = {
    name: '',
    nameError: '',
    lastName: '',
    lastNameError: '',
    idNumber: '',
    idNumberError: '',
    birthDate: moment().utc().subtract(20, 'y').toDate(),
    birthDateError: '',
    sex: 'F',
    showError: false,
    showSuccess: false,
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.auth.isFetching && !nextProps.auth.isFetching && nextProps.auth.error === '') {
      this.setState({ showSuccess: true });
    }

    if (nextProps.auth.error) {
      this.setState({ showError: true });
    }
  }

  handleCompleteRegister = () => {
    const { name, lastName, idNumber, birthDate, sex } = this.state;

    if (isEmptyString(name) || stringHasNumbers(name) || !isOnlyString(name)) {
      this.setState({ nameError: 'Ingrese un nombre válido.' });
    } else if (isEmptyString(lastName) || stringHasNumbers(lastName) || !isOnlyString(lastName)) {
      this.setState({ nameError: '', lastNameError: 'Ingrese un apellido válido.' });
    } else if (isEmptyString(idNumber) || !isValidDNI(idNumber)) {
      this.setState({ nameError: '', lastNameError: '', idNumberError: 'Ingrese un DNI válido' });
    } else if (birthDate === null) {
      this.setState({ nameError: '', lastNameError: '', idNumberError: '', birthDateError: 'Ingrese una fecha de nacimiento.' });
    } else {
      this.setState({ nameError: '', lastNameError: '', idNumberError: '', birthDateError: '' });
      const { dispatch } = this.props;
      const token = new URLSearchParams(window.location.search).get('token');

      const data = {
        name,
        lastName,
        idNumber,
        sex,
        birthDate: moment.utc(birthDate).format('YYYY-MM-DD'),
        token,
      };

      dispatch(completeRegistration(data));
    }
  }

  formatDate = (date) => {
    const string = moment.utc(date).format('DD / MM / YYYY');
    return string;
  }

  handleSuccessCallback = () => {
    this.setState({ showSuccess: false });
    browserHistory.push('/login');
  }

  render() {
    return (
      <div className={classnames('homeBackground', 'formCenter')}>
        <Card>
          <CardTitle
            title="Completar Registro"
            subtitle="Necesitamos que completes algunos datos extra"
          />
          <CardText>
            <TextField
              value={this.state.name}
              onChange={(e, name) => this.setState({ name })}
              errorText={this.state.nameError}
              hintText="Ingresa tu nombre"
              type="text"
              floatingLabelText="Nombre"
              fullWidth
            />
            <TextField
              value={this.state.lastName}
              onChange={(e, lastName) => this.setState({ lastName })}
              errorText={this.state.lastNameError}
              hintText="Ingresa tu apellido"
              type="text"
              floatingLabelText="Apellido"
              fullWidth
            />
            <TextField
              value={this.state.idNumber}
              onChange={(e, idNumber) => this.setState({ idNumber })}
              errorText={this.state.idNumberError}
              hintText="Ingresa tu DNI"
              type="text"
              floatingLabelText="DNI"
              fullWidth
            />
            <div style={{ paddingTop: '2vh' }}>
              <DatePicker
                textFieldStyle={{ width: '100%' }}
                hintText="Fecha de Nacimiento"
                shouldDisableDate={validarMayorDeEdad}
                onChange={(e, birthDate) => this.setState({ birthDate })}
                value={correctDate(this.state.birthDate)}
                locale="es-ES"
                formatDate={this.formatDate}
                DateTimeFormat={Intl.DateTimeFormat}
              />
              <p style={{ color: 'rgb(244, 67, 54)' }}>
                {this.state.birthDateError}
              </p>
            </div>
            <div style={{ fontWeight: 'bold', marginTop: 16 }}>
              Elija su sexo:
              <RadioButtonGroup name="groupalSex" onChange={(e, sex) => this.setState({ sex })} defaultSelected={this.state.sex}>
                <RadioButton
                  value="F"
                  label="Femenino"
                  style={{ marginTop: 16 }}
                />
                <RadioButton
                  value="M"
                  label="Masculino"
                />
                <RadioButton
                  value="O"
                  label="Otro"
                />
              </RadioButtonGroup>
            </div>
          </CardText>
          <CardActions style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
            <RaisedButton
              label="Confirmar"
              onTouchTap={this.handleCompleteRegister}
              primary
              fullWidth
            />
          </CardActions>
        </Card>
        <SweetAlert
          show={this.state.showError}
          title="Error al completar registro"
          text={this.props.auth.error}
          onConfirm={() => this.setState({ showError: false })}
        />
        <SweetAlert
          show={this.state.showSuccess}
          title="Exito"
          text="El registro se completo correctamente. Por favor ingrese su email y contraseña para usar el sistema."
          onConfirm={this.handleSuccessCallback}
        />

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(CompleteRegister);
