import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { TextField, RaisedButton, FlatButton } from 'material-ui';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';
import classnames from 'classnames';
import SweetAlert from 'sweetalert-react';

import 'sweetalert/dist/sweetalert.css';

import { signUp } from '../../../../store/Auth';
import { isValidEmail, isValidPassword, isValidMatricula } from '../../../../utils/validations';
import './styles.css';

class Register extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    auth: PropTypes.shape({
      isFetching: PropTypes.bool.isRequired,
      error: PropTypes.string.isRequired,
    }).isRequired,
  }

  state = {
    esMedico: false,
    email: '',
    showError: false,
    password: '',
    emailError: '',
    passwordError: '',
    registrationNumber: '',
    registrationNumberError: '',
    fileError: '',
  }

  componentWillMount() {
    const esMedico = window.location.href.split('?').pop() === 'medico';
    this.setState({ esMedico });
  }

  componentWillReceiveProps(nextProps) {
    const { auth } = nextProps;
    if (this.props.auth.isFetching && !auth.isFetching && auth.error === '') {
      browserHistory.push('registerSuccess');
    }
    if (nextProps.auth.error) {
      this.setState({ showError: true });
    }
  }

  componentWillUnmount() {
    this.setState({ showError: false });
  }

  handleRegister = () => {
    const { email, password, esMedico, registrationNumber } = this.state;

    if (email === '' || !isValidEmail(email)) {
      this.setState({ emailError: 'Ingrese una dirección de mail válida.' });
    } else if (password === '' || !isValidPassword(password)) {
      this.setState({ emailError: '', passwordError: 'Ingrese una contraseña válida.' });
    } else if (esMedico && (registrationNumber === '' || !isValidMatricula(registrationNumber))) {
      this.setState({ emailError: '', passwordError: '', registrationNumberError: 'Ingrese una matrícula válida.' });
    } else if (esMedico && !this.fileInput.files[0]) {
      this.setState({
        emailError: '',
        passwordError: '',
        registrationNumberError: '',
        evidenceError: 'Debe ingresar la evidencia que verifique que usted es médico.',
      });
    } else {
      this.setState({ emailError: '', passwordError: '', registrationNumberError: '', evidenceError: '' });

      const { dispatch } = this.props;
      const role = esMedico ? 'ROLE_MEDICO' : 'ROLE_PACIENTE';
      let file = null;
      if (role === 'ROLE_MEDICO') {
        file = this.fileInput.files[0];
      }
      dispatch(signUp({ email, password, role, registrationNumber, file }));
    }
  }

  handleToggleTipoCuenta = (event, esMedico) => this.setState({ esMedico });

  render() {
    return (
      <div className={classnames('homeBackground', 'formCenter')}>
        <Card>
          <CardTitle title="Registrarse" />
          <CardText>
            <TextField
              onChange={(e, email) => this.setState({ email })}
              value={this.state.email}
              errorText={this.state.emailError}
              hintText="mi@email.com"
              floatingLabelText="Email"
              fullWidth
            />
            <TextField
              onChange={(e, password) => this.setState({ password })}
              value={this.state.password}
              errorText={this.state.passwordError}
              hintText="tu contraseña"
              floatingLabelText="Contraseña"
              type="password"
              fullWidth
            />
          </CardText>
          {this.state.passwordError ? (<CardText color="gray">
            La contraseña debe contener:<br />
            • Una letra mayúscula<br />
            • Una letra minúscula<br />
            • Un número<br />
            • Un caracter especial !@#&/()?¿¡$%<br />
            • Al menos 8 caracteres </CardText>) : ''
          }
          <CardText>
            <Toggle
              toggled={this.state.esMedico}
              onToggle={this.handleToggleTipoCuenta}
              labelPosition="right"
              label="Soy médico"
            />
          </CardText>
          {
            this.state.esMedico && (
              <div>
                <CardText>
                  <TextField
                    onChange={(e, registrationNumber) => this.setState({ registrationNumber })}
                    value={this.state.registrationNumber}
                    errorText={this.state.registrationNumberError}
                    hintText="tu matrícula"
                    floatingLabelText="Matrícula"
                    fullWidth
                  />
                </CardText>
                <CardText>
                  <input
                    ref={(input) => { this.fileInput = input; }}
                    style={{ marginTop: '2vh' }}
                    type="file"
                    name="archivo"
                  />
                  {this.state.evidenceError ? (
                    <CardText color="red">
                    Adjunte documento firmado para certificar la validez <br />
                    en el Registro Único de Profesionales.<br />
                    Más información
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="http://www.msal.gob.ar/images/stories/tramites-servicios/certificaciones/ru2.pdf"
                    >
                      &nbsp;aquí
                    </a>
                    </CardText>) : ''
                  }
                </CardText>
              </div>
            )
          }
          <CardActions style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
            <RaisedButton
              label="Registrarse"
              onTouchTap={this.handleRegister}
              primary
              fullWidth
            />
            <FlatButton
              label="Loguearse"
              onTouchTap={() => browserHistory.push('/login')}
              fullWidth
            />
          </CardActions>
        </Card>
        <SweetAlert
          show={this.state.showError}
          title="Error al registrarse"
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

export default connect(mapStateToProps)(Register);
