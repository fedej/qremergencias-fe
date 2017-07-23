import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { TextField, RaisedButton, DatePicker } from 'material-ui';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import classnames from 'classnames';
import moment from 'moment';
import _ from 'lodash';

import { isValidDNI } from '../../../../utils/validations';

import { completeRegistration } from '../../../../store/Auth';
import '../../styles.css';

import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';


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
    numeroDocumento: '',
    numeroDocumentoError: '',
    birthDate: null,
    showError: false,
    birthDateError: '',
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.auth.isFetching && !nextProps.auth.isFetching && nextProps.auth.error === '') {
      browserHistory.push('/login');
    }
    if (nextProps.auth.error) {
      this.setState({ showError: true });
    }
  }

  handleCompleteRegister = () => {
    const { dispatch } = this.props;
    const { name, lastName, birthDate } = this.state;
    const token = new URLSearchParams(window.location.search).get('token');
    const errors = {};

    if (name === '') {
      errors.nameError = 'Ingrese un nombre';
    }

    if (lastName === '') {
      errors.lastNameError = 'Ingrese su apellido';
    }

    if (!birthDate) {
      errors.birthDateError = 'Ingrese su fecha de nacimiento';
    }

    if (_.isEmpty(errors)) {
      const data = {
        name,
        lastName,
        birthDate: moment(birthDate).format('YYYY-MM-DD'),
        token,
      };

      dispatch(completeRegistration(data));
    } else {
      this.setState(errors);
    }
  }

  render() {
    // TODO: mostrar error de Store.auth.error
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
              errorText={this.state.nameError}
              type="text"
              floatingLabelText="Nombre"
              fullWidth
            />
            <TextField
              value={this.state.lastName}
              onChange={(e, lastName) => this.setState({ lastName })}
              errorText={this.state.lastNameError}
              hintText="Ingresa tu apellido"
              errorText={this.state.lastNameError}
              type="number"
              floatingLabelText="Apellido"
              fullWidth
            />
            <TextField
              value={this.state.numeroDocumento}
              onChange={(e, numeroDocumento) => this.setState({ numeroDocumento })}
              errorText={this.state.numeroDocumentoError}
              hintText="Ingresa tu DNI"
              type="text"
              floatingLabelText="DNI"
              fullWidth
            />
            <div style={{ paddingTop: '2vh' }}>
              <DatePicker
                textFieldStyle={{ width: '100%' }}
                hintText="Fecha de Nacimiento"
                onChange={(e, birthDate) => this.setState({ birthDate })}
                errorText={this.state.birthDateError}
              />
              <p style={{ color: 'rgb(244, 67, 54)' }}>
                {this.state.birthDateError}
              </p>
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
