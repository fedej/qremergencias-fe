import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { TextField, RaisedButton, DatePicker } from 'material-ui';
import Dialog from 'material-ui/Dialog';
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
    firstNameError: '',
    lastName: '',
    lastNameError: '',
    docNumber: '',
    docNumberError: '',
    birthDate: '',
    birthDateError: '',
    contacts: [],
    contactDialogOpened: false,
    contactFirstName: '',
    contactLastName: '',
    contactPhoneNumber: '',
  }

  handleOpenContactDialog = () => {
    this.setState({contactDialogOpened: true});
  };

  handleContactData = () => {
       const { contactFirstName, contactLastName, contactPhoneNumber } = this.state;
       let contacts = [];
       if (this.state.contacts) {
         contacts = this.state.contacts;
         contacts.push({ contactFirstName, contactLastName, contactPhoneNumber });
       } else {
         contacts = [{ contactFirstName, contactLastName, contactPhoneNumber }];
       }
       this.setState({ contacts , contactDialogOpened: false});
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchProfile());
  }

  componentWillReceiveProps(nextProps) {
    const { profile } = nextProps;

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
    const { firstName, lastName, docNumber, birthDate } = this.state;

    if (firstName === '') {
      this.setState({ firstNameError: 'Ingrese un nombre.' });
    } else if (lastName === '') {
      this.setState({ firstNameError: '', lastNameError: 'Ingrese un apellido.' });
    } else if (docNumber === '' || !isValidDNI(docNumber)) {
      this.setState({ firstNameError: '', lastNameError: '', docNumberError: 'Ingrese un DNI valido: xx.xx.xx' });
    } else if (birthDate === null) {
      this.setState({ firstNameError: '', lastNameError: '', docNumberError: '', birthDateError: 'Ingrese una fecha de nacimiento.' });
    } else {
      this.setState({ firstNameError: '', lastNameError: '', docNumberError: '', birthDateError: '' });
      const { dispatch } = this.props;
      dispatch(updateProfile(this.state));
      window.location.reload();
    }
  }

  render() {
    const actions = [
      <RaisedButton
        label="Cancel"
        onTouchTap={this.handleCloseContactDialog}
      />,
      <RaisedButton
        label="Submit"
        primary={true}
        onTouchTap={this.handleContactData}
      />,
    ];
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
                value={this.state.firstName}
                onChange={(e, firstName) => this.setState({ firstName })}
                errorText={this.state.firstNameError}
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
                value={this.state.docNumber}
                onChange={(e, docNumber) => this.setState({ docNumber })}
                errorText={this.state.docNumberError}
                hintText="Ingresá tu DNI"
                type="text"
                floatingLabelText="DNI"
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
                      return (<TableRow selected={this.isSelected(i)}>
                        <TableRowColumn>{c.contactFirstName}</TableRowColumn>
                        <TableRowColumn>{c.contactLastName}</TableRowColumn>
                        <TableRowColumn>{c.contactPhoneNumber}</TableRowColumn>
                      </TableRow>);
                    })
                  }
                </TableBody>
              ) : ''}
            </Table>
            <Dialog
              title="Contactos de emergencia"
              actions={actions}
              modal={true}
              open={this.state.contactDialogOpened}
            >
              <TextField
                value={this.state.contactFirstName}
                onChange={(e, contactFirstName) => this.setState({ contactFirstName })}
                hintText="Nombre"
                type="text"
                floatingLabelText="Nombre"
                fullWidth
              />
              <TextField
                value={this.state.contactLastName}
                onChange={(e, contactLastName) => this.setState({ contactLastName })}
                hintText="Apellido"
                type="text"
                floatingLabelText="Apellido"
                fullWidth
              />
              <TextField
                value={this.state.contactPhoneNumber}
                onChange={(e, contactPhoneNumber) => this.setState({ contactPhoneNumber })}
                hintText="N° de Teléfono"
                type="text"
                floatingLabelText="N° de Teléfono"
                fullWidth
              />
            </Dialog>
            <CardActions style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
              <RaisedButton
                label="Guardar"
                onTouchTap={this.handleActualizarPerfil}
                primary
              />
              <RaisedButton
                label="Agregar"
                onTouchTap={this.handleOpenContactDialog}
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
