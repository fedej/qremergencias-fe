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

import { fetchProfile, updateProfile } from '../../store/Perfil';

import { isValidDNI } from '../../utils/validations';

import Home from '../Home';


class Perfil extends React.Component {

  static defaultProps = {
    profile: {},
  }
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    profile: PropTypes.shape({
      perfil: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        docNumber: PropTypes.string,
        birthDate: PropTypes.string,
        contacts: PropTypes.array,
      }),
      error: PropTypes.string,
      isFetching: PropTypes.bool,
    }),
  }

  state = {
    showError: false,
    selected: [],
    perfil: {},
    firstName: '',
    lastName: '',
    docNumber: '',
    birthDate: '',
    contacts: [],
  }

  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(fetchProfile());
  }

  componentWillReceiveProps(nextProps) {
    const {profile} = nextProps;

    if (profile) {
      this.setState({
        firstName: profile.firstName,
        lastName: profile.lastName,
        docNumber: profile.docNumber,
        birthDate: profile.birthDate,
        contacts: profile.contacts,
      });
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
    dispatch(updateProfile(this.state));
  };

  addRow = () => {
    let contacts = [];
    if(this.state.contacts) {
      contacts = this.state.contacts;
      contacts.push({firstName: '', lastName: '', phoneNumber: ''});
    } else {
      contacts = [{firstName: '', lastName: '', phoneNumber: ''}];
    }
    this.setState({contacts});

  };

  render() {
    return (
      <Home>
        <div className={classnames('formCenter')}>
          <Card style={{margin: '20px'}}>
            <CardTitle
              title="Perfil de usuario"
              subtitle="Actualizá tus datos personales y contactos de emergencia"
            />
            <CardText>
              <TextField
                value={this.state.firstName}
                onChange={(e, firstName) => this.setState({ firstName })}
                errorText={this.state.nameError}
                hintText="Ingresá tu nombre"
                type="text"
                floatingLabelText="Nombre"
                floatingLabelFixed={true}
                fullWidth
              />
              <TextField
                value={this.state.lastName}
                onChange={(e, lastName) => this.setState({ lastName })}
                errorText={this.state.lastNameError}
                hintText="Ingresá tu apellido"
                type="text"
                floatingLabelText="Apellido"
                floatingLabelFixed={true}
                fullWidth
              />
              <TextField
                value={this.state.docNumber}
                onChange={(e, numeroDocumento) => this.setState({ numeroDocumento })}
                errorText={this.state.numeroDocumentoError}
                hintText="Ingresá tu DNI"
                type="text"
                floatingLabelText="DNI"
                floatingLabelFixed={true}
                fullWidth
              />
              <div style={{ paddingTop: '2vh' }}>
                <DatePicker
                  value={this.state.birthDate}
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
              {this.state.contacts ? (
                  <TableBody>
                  {
                    this.state.contacts.map((c, i) => {
                      return <TableRow key={i} selected={this.isSelected(i)}>
                        <TableRowColumn>{c.firstName}</TableRowColumn>
                        <TableRowColumn>{c.lastName}</TableRowColumn>
                        <TableRowColumn>{c.phoneNumber}</TableRowColumn>
                      </TableRow>
                    })
                  }
                  </TableBody>
              ): ''}
            </Table>
            <CardActions style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
              <RaisedButton
                label="Guardar"
                onTouchTap={this.handleActualizarPerfil}
                primary
              />
              <RaisedButton
                label="Agregar"
                onTouchTap={this.addRow.bind(this)}
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
    profile: state.profile.perfil,
  };
}

export default connect(mapStateToProps)(Perfil);
