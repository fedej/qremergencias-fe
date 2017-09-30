import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { TextField, RaisedButton, FlatButton } from 'material-ui';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import classnames from 'classnames';
import SweetAlert from 'sweetalert-react';

import 'sweetalert/dist/sweetalert.css';

import { logIn } from '../../../../store/Auth';
import { isValidEmail } from '../../../../utils/validations';
import './styles.css';


class Login extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,
  }

  state = {
    esMedico: false,
    email: '',
    showError: false,
    password: '',
    emailError: '',
    passwordError: '',
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.setState({ showError: true });
    }
  }

  readCookie = (name) => {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');

    for (let i = 0; i < ca.length; i += 1) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }

    return null;
  };

  handleLogin = () => {
    const { email, password } = this.state;

    if (email === '' || !isValidEmail(email)) {
      this.setState({ emailError: 'Ingrese una dirección de mail válida.' });
    } else if (password === '') {
      this.setState({ emailError: '', passwordError: 'Ingrese su contraseña' });
    } else {
      this.setState({ emailError: '', passwordError: '' });

      if (this.readCookie('showCaptcha')) {
        // grecaptcha.reset();
        // grecaptcha.execute();

        // TODO: chequear si se puede hacer esto de una
        const { dispatch } = this.props;
        dispatch(logIn({ username: email, password }));
      } else {
        const { dispatch } = this.props;
        dispatch(logIn({ username: email, password }));
      }
    }
  };

  handleToggleTipoCuenta = (event, esMedico) => this.setState({ esMedico });

  render() {
    return (
      <div className={classnames('homeBackground', 'formCenter')}>
        <Card>
          <CardTitle title="Iniciar Sesión" subtitle="Ingrese sus datos" />
          <CardText>
            <TextField
              value={this.state.email}
              onChange={(e, email) => this.setState({ email })}
              errorText={this.state.emailError}
              hintText="mi@email.com"
              type="email"
              floatingLabelText="Email"
              fullWidth
            />
            <TextField
              value={this.state.password}
              onChange={(e, password) => this.setState({ password })}
              hintText="tu contraseña"
              errorText={this.state.passwordError}
              floatingLabelText="Contraseña"
              type="password"
              fullWidth
            />
          </CardText>
          <CardActions style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
            <RaisedButton
              label="Loguearse"
              onTouchTap={this.handleLogin}
              primary
              fullWidth
            />
            <FlatButton
              label="Registrarse"
              onTouchTap={() => browserHistory.push('/register')}
              fullWidth
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '2vh' }}>
              <FlatButton
                label="Olvidaste tu contraseña?"
                onTouchTap={() => browserHistory.push('/forgotPassword')}
              />
            </div>
          </CardActions>
        </Card>
        <SweetAlert
          show={this.state.showError}
          title="Error"
          text={this.props.error}
          onConfirm={() => this.setState({ showError: false })}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    error: state.auth.error,
    isLoggedIn: state.auth.isLoggedIn,
  };
}

export default connect(mapStateToProps)(Login);
