import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TextField, RaisedButton, DatePicker } from 'material-ui';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import classnames from 'classnames';
import moment from 'moment';

import { completeRegistration } from '../../../../store/Auth';
import '../../styles.css';

class CompleteRegister extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  state = {
    name: '',
    lastName: '',
    birthDate: null,
  }

  handleCompleteRegister = () => {
    const { dispatch } = this.props;
    const { name, lastName, birthDate } = this.state;
    const token = new URLSearchParams(window.location.search).get('token');
    // TODO: validar datos

    const data = {
      name,
      lastName,
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
              hintText="Ingresa tu nombre"
              type="text"
              floatingLabelText="Nombre"
              fullWidth
            />
            <TextField
              value={this.state.lastName}
              onChange={(e, lastName) => this.setState({ lastName })}
              hintText="Ingresa tu apellido"
              type="text"
              floatingLabelText="Apellido"
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

export default connect()(CompleteRegister);
