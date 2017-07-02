import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { TextField, RaisedButton, FlatButton } from 'material-ui';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';
import classnames from 'classnames';

import { signUp } from '../../store/Auth';
import { isValidEmail } from '../../utils/validations';
import './styles.css';

class Register extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  state = {
    esMedico: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
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
    // TODO: mostrar error del server
  }

  handleRegister = () => {
    const { email, password, esMedico } = this.state;

    if (email === '' || !isValidEmail(email)) {
      this.setState({ emailError: 'Ingrese una dirección de mail válida.' });
    } else if (password === '') {
      this.setState({ emailError: '', passwordError: 'Ingrese su contraseña' });
    } else {
      this.setState({ emailError: '', passwordError: '' });

      const { dispatch } = this.props;
      const role = esMedico ? 'ROLE_MEDICO' : 'ROLE_PACIENTE';
      dispatch(signUp({ email, password, role }));
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
          <CardText>
            <Toggle
              toggled={this.state.esMedico}
              onToggle={this.handleToggleTipoCuenta}
              labelPosition="right"
              label="Soy médico"
            />
          </CardText>
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
