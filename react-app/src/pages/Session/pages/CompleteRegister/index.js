import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { TextField, RaisedButton, DatePicker } from 'material-ui';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import classnames from 'classnames';
import moment from 'moment';
import _ from 'lodash';

import { completeRegistration } from '../../../../store/Auth';
import '../../styles.css';

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
    lastName: '',
    birthDate: null,
    nameError: '',
    lastNameError: '',
    birthDateError: '',
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.auth.isFetching && !nextProps.auth.isFetching && nextProps.auth.error === '') {
      browserHistory.push('/login');
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
            title="Completar Registración"
            subtitle="Necesitamos que completes algunos datos extra"
          />
          <CardText>
            <TextField
              value={this.state.name}
              onChange={(e, name) => this.setState({ name })}
              hintText="Ingresa tu nombre"
              errorText={this.state.nameError}
              type="text"
              floatingLabelText="Nombre"
              fullWidth
            />
            <TextField
              value={this.state.lastName}
              onChange={(e, lastName) => this.setState({ lastName })}
              hintText="Ingresa tu apellido"
              errorText={this.state.lastNameError}
              type="number"
              floatingLabelText="Apellido"
              fullWidth
            />
            <div style={{ paddingTop: '2vh' }}>
              <DatePicker
                textFieldStyle={{ width: '100%' }}
                hintText="Fecha de Nacimiento"
                onChange={(e, birthDate) => this.setState({ birthDate })}
              />
              <p style={{ color: 'rgb(244, 67, 54)' }}>
                {this.state.birthDateError}
              </p>
            </div>
          </CardText>
          <CardActions
            style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}
          >
            <RaisedButton
              label="Confirmar"
              onTouchTap={this.handleCompleteRegister}
              primary
              fullWidth
            />
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default connect(
  state => ({ auth: state.auth }),
)(CompleteRegister);
