import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { TextField, RaisedButton, DatePicker } from 'material-ui';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import classnames from 'classnames';
import SweetAlert from 'sweetalert-react';

import 'sweetalert/dist/sweetalert.css';

import { fetchProfile } from '../../store/Perfil';

import { isValidDNI } from '../../utils/validations';

import Home from '../Home';


class Perfil extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    profile: PropTypes.shape({
      perfil: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        docNumber: PropTypes.string.isRequired,
        birthDate: PropTypes.string.isRequired,
        contacts: PropTypes.array,
      }),
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
    birthDateError: '',
    showError: false,
    selected: [],
  }

  componentWillMount() {
    // const { dispatch } = this.props;
    // dispatch(fetchProfile());
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.profile.isFetching && !nextProps.profile.isFetching && nextProps.profile.error === '') {
      browserHistory.push('/perfil');
    }
    if (nextProps.profile.error) {
      this.setState({ showError: true });
    }
  }

  isSelected = (index) => {
    const result = this.state.selected.indexOf(index) !== -1;
    return result;
  };

  handleRowSelection = (selectedRows) => {
    this.setState({
      selected: selectedRows,
    });
  };

  handleActualizarPerfil = () => {
    const { dispatch } = this.props;
    dispatch(fetchProfile());
  };

  render() {
    return (
      <Home>
        <div className={classnames('formCenter')}>
          <Card style={{ margin: '20px' }}>
            <CardTitle
              title="Perfil de usuario"
              subtitle="Actualizá tus datos personales y contactos de emergencia"
            />
            <CardText>
              <TextField
                value={this.state.name}
                onChange={(e, name) => this.setState({ name })}
                errorText={this.state.nameError}
                hintText="Ingresá tu nombre"
                type="text"
                floatingLabelText="Nombre"
                fullWidth
              />
              <TextField
                value={this.state.lastName}
                onChange={(e, lastName) => this.setState({ lastName })}
                errorText={this.state.lastNameError}
                hintText="Ingresá tu apellido"
                type="text"
                floatingLabelText="Apellido"
                fullWidth
              />
              <TextField
                value={this.state.numeroDocumento}
                onChange={(e, numeroDocumento) => this.setState({ numeroDocumento })}
                errorText={this.state.numeroDocumentoError}
                hintText="Ingresá tu DNI"
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
              </div>
            </CardText>
            <Table onRowSelection={this.handleRowSelection}>
              <TableHeader>
                <TableRow>
                  <TableHeaderColumn>Nombre</TableHeaderColumn>
                  <TableHeaderColumn>Apellido</TableHeaderColumn>
                  <TableHeaderColumn>Telefono</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow selected={this.isSelected(0)}>
                  <TableRowColumn>Gonzalo</TableRowColumn>
                  <TableRowColumn>Rrramundo</TableRowColumn>
                  <TableRowColumn>4319-1921</TableRowColumn>
                </TableRow>
                <TableRow selected={this.isSelected(1)}>
                  <TableRowColumn>Federico</TableRowColumn>
                  <TableRowColumn>Jjjaite</TableRowColumn>
                  <TableRowColumn>4531-2315</TableRowColumn>
                </TableRow>
                <TableRow selected={this.isSelected(2)}>
                  <TableRowColumn></TableRowColumn>
                  <TableRowColumn></TableRowColumn>
                  <TableRowColumn></TableRowColumn>
                </TableRow>
              </TableBody>
            </Table>
            <CardActions style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
              <RaisedButton
                label="Guardar"
                onTouchTap={this.handleActualizarPerfil}
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
            title="Error al actualizar el perfil"
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
    profile: state.profile,
  };
}

export default connect(mapStateToProps)(Perfil);

