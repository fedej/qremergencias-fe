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
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Progress from 'react-progress-2';
import 'react-progress-2/main.css';
import 'sweetalert/dist/sweetalert.css';

import { fetchProfile, updateProfile } from '../../store/Perfil';

import { isValidDNI, isValidPhoneNumber } from '../../utils/validations';

import Home from '../Home';


class Perfil extends React.Component {

  static defaultProps = {
    profile: {},
  }
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    perfil: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      idNumber: PropTypes.string,
      birthDate: PropTypes.instanceOf(Date),
      sex: PropTypes.string,
      contacts: PropTypes.array,
    }).isRequired,
    isFetching: PropTypes.bool.isRequired,
    isMedico: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
  }

  state = {
    showMessage: false,
    selected: [],
    selectedIndex: '',
    perfil: {},
    firstName: '',
    firstNameError: '',
    lastName: '',
    lastNameError: '',
    idNumber: '',
    idNumberError: '',
    birthDate: new Date(),
    birthDateError: '',
    sex: '',
    contacts: [],
    contactDialogOpened: false,
    contactFirstName: '',
    contactFirstNameError: '',
    contactLastName: '',
    contactLastNameError: '',
    contactPhoneNumber: '',
    contactPhoneNumberError: '',
    message: '',
    title: '',
    loaded: false,
  }

  componentWillMount() {
    const { dispatch, error } = this.props;
    dispatch(fetchProfile());

    if (error) {
      this.setState({
        showMessage: true,
        message: error,
        title: 'Error al actualizar perfil',
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { perfil } = nextProps;

    if (perfil.error) {
      this.setState({ showMessage: true, message: perfil.error });
    }

    if (this.props.isFetching && !nextProps.isFetching && !nextProps.error) {
      let more = {};
      if (this.state.loaded) {
        more = {
          showMessage: true,
          title: 'Perfil actualizado',
          message: 'Perfil actualizado',
        };
      } else {
        more = { loaded: true };
      }

      this.setState({
        firstName: perfil.firstName,
        lastName: perfil.lastName,
        idNumber: perfil.idNumber || '',
        birthDate: perfil.birthDate,
        sex: perfil.sex,
        contacts: perfil.contacts,
        ...more,
      }, Progress.hide);
    } else if (this.props.isFetching || (nextProps.isFetching && !this.props.isFetching)) {
      Progress.show();
    } else {
      Progress.hide();
      this.setState({
        showMessage: true,
        message: 'Perfil actualizado',
      });
    }
  }

  isSelected = (index) => {
    const result = this.state.selected.indexOf(index) !== -1;
    return result;
  };

  handleEraseContact = (key) => {
    const contacts = this.state.contacts;
    contacts.splice(key, 1);
    this.setState({ contacts, selected: [] });
  }

  handleRowSelection = (selectedRows) => {
    this.setState({
      selected: selectedRows,
    });
  };

  handleCloseContactDialog = () => {
    this.setState({ contactDialogOpened: false });
    this.setState({ contactFirstName: '', contactLastName: '', contactPhoneNumber: '', selectedIndex: '' });
  };

  handleOpenContactDialog = () => {
    const { contacts, selected } = this.state;
    if (selected.length) {
      const selectedIndex = selected[0];
      this.setState({
        contactDialogOpened: true,
        contactFirstName: contacts[selectedIndex].firstName,
        contactLastName: contacts[selectedIndex].lastName,
        contactPhoneNumber: contacts[selectedIndex].phoneNumber,
        selectedIndex,
      });
    } else {
      this.setState({
        contactDialogOpened: true,
      });
    }
  };

  handleContactData = () => {
    const { contactFirstName, contactLastName, contactPhoneNumber, selectedIndex } = this.state;

    if (contactFirstName === '') {
      this.setState({ contactFirstNameError: 'Ingrese un nombre.' });
    } else if (contactLastName === '') {
      this.setState({ contactFirstNameError: '', contactLastNameError: 'Ingrese un apellido.' });
    } else if (contactPhoneNumber === '' || !isValidPhoneNumber(contactPhoneNumber)) {
      this.setState({ contactFirstNameError: '', contactLastNameError: '', contactPhoneNumberError: 'Ingrese un teléfono válido.' });
    } else {
      this.setState({ contactFirstNameError: '', contactLastNameError: '', contactPhoneNumberError: '' });

      let contacts = [];

      if (selectedIndex !== '') {
        contacts = this.state.contacts;
        contacts[selectedIndex].firstName = contactFirstName;
        contacts[selectedIndex].lastName = contactLastName;
        contacts[selectedIndex].phoneNumber = contactPhoneNumber;
      } else {
        if (this.state.contacts) {
          contacts = this.state.contacts;
        }
        contacts.push({
          firstName: contactFirstName,
          lastName: contactLastName,
          phoneNumber: contactPhoneNumber,
        });
      }
      this.setState({ contacts, contactDialogOpened: false });
      this.setState({ contactFirstName: '', contactLastName: '', contactPhoneNumber: '', selectedIndex: '' });
    }
  }

  handleActualizarPerfil = () => {
    const { firstName, lastName, idNumber, birthDate, sex, contacts } = this.state;

    if (firstName === '') {
      this.setState({ firstNameError: 'Ingrese un nombre.' });
    } else if (lastName === '') {
      this.setState({ firstNameError: '', lastNameError: 'Ingrese un apellido.' });
    } else if (idNumber === '' || !isValidDNI(idNumber)) {
      this.setState({ firstNameError: '', lastNameError: '', idNumberError: 'Ingrese un DNI válido: xx.xx.xx' });
    } else if (birthDate === null) {
      this.setState({ firstNameError: '', lastNameError: '', idNumberError: '', birthDateError: 'Ingrese una fecha de nacimiento.' });
    } else {
      this.setState({ firstNameError: '', lastNameError: '', idNumberError: '', birthDateError: '' });
      const { dispatch } = this.props;

      const data = {
        firstName,
        lastName,
        idNumber,
        birthDate,
        sex,
        contacts,
      };

      // TODO = devolver un mensaje de guardado exitoso
      dispatch(updateProfile(data));
    }
  }

  render() {
    const actions = [
      <RaisedButton
        label="Cancelar"
        onTouchTap={this.handleCloseContactDialog}
      />,
      <RaisedButton
        label="Aceptar"
        primary
        onTouchTap={this.handleContactData}
      />,
    ];
    return (
      <Home>
        <div>
          <Progress.Component
            style={{ background: 'white' }}
            thumbStyle={{ background: 'red' }}
          />
          <div className={classnames('formCenter')}>
            <Card style={{ margin: '20px' }}>
              <table style={{ width: '100%', tableLayout: 'fixed' }}>
                <tbody>
                  <tr style={{ verticalAlign: 'top' }}>
                    <td style={{ width: '50%' }}>
                      <Card style={{ margin: '20px' }}>
                        <CardTitle
                          title="Perfil de usuario"
                          subtitle="Actualizá tus datos personales"
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
                            value={this.state.idNumber}
                            onChange={(e, idNumber) => this.setState({ idNumber })}
                            errorText={this.state.idNumberError}
                            hintText="Ingresá tu DNI"
                            type="text"
                            floatingLabelText="DNI"
                            fullWidth
                          />
                          <DatePicker
                            value={this.state.birthDate}
                            textFieldStyle={{ width: '100%' }}
                            hintText="Fecha de Nacimiento"
                            floatingLabelText="Fecha de Nacimiento"
                            onChange={(e, birthDate) => this.setState({ birthDate })}
                            errorText={this.state.birthDateError}
                          />
                          <div style={{ fontWeight: 'bold', marginTop: 16 }}>
                            Sexo:
                            <RadioButtonGroup name="groupalSex" onChange={(e, sex) => this.setState({ sex })} valueSelected={this.state.sex}>
                              <RadioButton
                                value="F"
                                label="Femenino"
                                style={{ marginTop: 16 }}
                              />
                              <RadioButton
                                value="M"
                                label="Masculino"
                              />
                              <RadioButton
                                value="O"
                                label="Otro"
                              />
                            </RadioButtonGroup>
                          </div>
                        </CardText>
                        <Dialog
                          title="Contactos de emergencia"
                          actions={actions}
                          modal
                          open={this.state.contactDialogOpened}
                        >
                          <TextField
                            value={this.state.selected.length ?
                              (this.state.contacts[this.state.selected[0]].firstName) :
                              (this.state.contactFirstName)}
                            errorText={this.state.contactFirstNameError}
                            onChange={(e, contactFirstName) => this.setState({ contactFirstName })}
                            hintText="Nombre"
                            type="text"
                            floatingLabelText="Nombre"
                            fullWidth
                          />
                          <TextField
                            value={this.state.contactLastName}
                            errorText={this.state.contactLastNameError}
                            onChange={(e, contactLastName) => this.setState({ contactLastName })}
                            hintText="Apellido"
                            type="text"
                            floatingLabelText="Apellido"
                            fullWidth
                          />
                          <TextField
                            value={this.state.contactPhoneNumber}
                            errorText={this.state.contactPhoneNumberError}
                            onChange={(e, contactPhoneNumber) =>
                              this.setState({ contactPhoneNumber })}
                            hintText="Codigo de Area + N° de Teléfono"
                            type="text"
                            floatingLabelText="N° de Teléfono"
                            fullWidth
                          />
                        </Dialog>
                      </Card>
                    </td>
                    {
                      !this.props.isMedico ? (
                        <td style={{ width: '50%' }}>
                          <Card style={{ margin: '20px' }}>
                            <CardTitle
                              title="Contactos de Emergencia"
                              subtitle="Carga los datos de tu contactos para un caso de emergencia"
                            />
                            <Table onRowSelection={this.handleRowSelection}>
                              <TableHeader>
                                <TableRow>
                                  <TableHeaderColumn>Nombre</TableHeaderColumn>
                                  <TableHeaderColumn>Apellido</TableHeaderColumn>
                                  <TableHeaderColumn>Telefono</TableHeaderColumn>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {
                                  this.state.contacts && this.state.contacts.map((c, i) =>
                                    (<TableRow selected={this.isSelected(i)} key={i}>
                                      <TableRowColumn>{c.firstName}</TableRowColumn>
                                      <TableRowColumn>{c.lastName}</TableRowColumn>
                                      <TableRowColumn>{c.phoneNumber}</TableRowColumn>
                                    </TableRow>),
                                  )
                                }
                              </TableBody>
                            </Table>
                            <CardActions style={{ display: 'flex', justifyContent: 'left', flexDirection: 'row' }}>
                              <RaisedButton
                                label="Agregar"
                                onTouchTap={this.handleOpenContactDialog}
                                primary
                              />
                              {this.state.selected.length ? (
                                <div>
                                  <RaisedButton
                                    label="Editar"
                                    onTouchTap={this.handleOpenContactDialog}
                                    primary
                                  />
                                  &nbsp;&nbsp;
                                  <RaisedButton
                                    label="Borrar"
                                    onTouchTap={this.handleEraseContact}
                                    primary
                                  />
                                </div>
                              ) : ''}
                            </CardActions>
                          </Card>
                        </td>)
                        : null}
                  </tr>
                </tbody>
              </table>
              <CardActions style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
                <RaisedButton
                  label="Guardar"
                  onTouchTap={this.handleActualizarPerfil}
                  primary
                />
                <RaisedButton
                  label="Volver"
                  onTouchTap={() => browserHistory.push('/home')} // TODO: volver a ruta anterior
                />
              </CardActions>

            </Card>
            <SweetAlert
              show={this.state.showMessage}
              title={this.state.title}
              text={this.state.message}
              onConfirm={() => this.setState({ showMessage: false })}
            />
          </div>
        </div>
      </Home>
    );
  }
}

function mapStateToProps(state) {
  return {
    perfil: state.profile.perfil,
    error: state.profile.error,
    isMedico: state.auth.isMedico,
    isFetching: state.profile.isFetching,
  };
}

export default connect(mapStateToProps)(Perfil);
