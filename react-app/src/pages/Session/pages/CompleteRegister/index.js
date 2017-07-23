import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { TextField, RaisedButton, DatePicker } from 'material-ui';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import classnames from 'classnames';
import moment from 'moment';

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
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.auth.isFetching && !nextProps.auth.isFetching && nextProps.auth.error === '') {
      browserHistory.push('/login');
    }
  }

  handleCompleteRegister = () => {

    const { name, lastName, numeroDocumento, birthDate } = this.state;

    if (name === '') {
      this.setState({ nameError: 'Ingrese un nombre.' });
    } else if (lastName === '') {
      this.setState({ nameError: '', lastNameError: 'Ingrese un apellido.' });
    } else if (numeroDocumento === '' || !isValidDNI(numeroDocumento)) {
      this.setState({ nameError: '', lastNameError: '', numeroDocumentoError: 'Ingrese un DNI valido: xx.xx.xx' });
    } else {
      this.setState({ nameError: '', lastNameError: '', numeroDocumentoError: '' });
    }

    const { dispatch } = this.props;
    const token = new URLSearchParams(window.location.search).get('token');

    const data = {
      name,
      lastName,
      numeroDocumento,
      birthDate: moment(birthDate).format('YYYY-MM-DD'),
      token,
    };

    dispatch(completeRegistration(data));
  }

  render() {
    // TODO: mostrar error de Store.auth.error
    return (
      <div className={classnames('homeBackground', 'formCenter')}>
        <Card>
          <CardTitle
            title="Completar Registración"
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
              />
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
          title="Error"
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
