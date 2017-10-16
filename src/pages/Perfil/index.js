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

import { fetchProfile, updateProfile, changePassword } from '../../store/Perfil';

import { isValidDNI, isValidPhoneNumber, isValidPassword } from '../../utils/validations';

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
    password: '',
    passwordError: '',
    newPassword: '',
    newPasswordError: '',
    confirmPassword: '',
    confirmPasswordError: '',
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchProfile());
  }

  componentWillReceiveProps(nextProps) {
    const { perfil, error } = nextProps;
    if (error) {
      this.setState({ showMessage: true, message: error });
    }

    if (this.props.isFetching && !nextProps.isFetching && !nextProps.error) {
      let more = {};
      if (this.state.loaded) {
        more = {
          showMessage: true,
          title: 'Perfil',
          message: 'Modificación exitosa',
          password: '',
          newPassword: '',
          confirmPassword: '',
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
        password: '',
        newPassword: '',
        confirmPassword: '',
        ...more,
      }, Progress.hide);
    } else if (!this.props.isFetching && nextProps.isFetching) {
      Progress.show();
    } else {
      Progress.hide();

      if (this.props.isFetching && !error) {
        this.setState({
          showMessage: true,
          message: 'Perfil actualizado',
        });
      }
    }
  }

  isSelected = (index) => {
    const result = this.state.selected.indexOf(index) !== -1;
    return result;
  };

  handleEraseContact = () => {
    const { contacts, selected } = this.state;
    contacts.splice(selected, 1);
    this.setState({ contacts, selected: [] });
  }

  handleRowSelection = selected => this.setState({ selected });

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
      this.setState({ firstNameError: '', lastNameError: '', idNumberError: 'El DNI debe ser numérico' });
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

  handleChangePassword = () => {
    const { dispatch } = this.props;
    const {
      password,
      newPassword,
      confirmPassword,
    } = this.state;

    if (password === '') {
      this.setState({ passwordError: 'Ingrese su contraseña actual' });
    } else if (newPassword === '' || password === newPassword || !isValidPassword(newPassword)) {
      this.setState({ passwordError: '', newPasswordError: 'Ingrese una contraseña válida.' });
    } else if (newPassword !== confirmPassword) {
      this.setState({ passwordError: '', newPasswordError: '', confirmPasswordError: 'Las contraseñas no coinciden' });
    } else {
      this.setState({ passwordError: '', newPasswordError: '', confirmPasswordError: '' });
      dispatch(changePassword({ password, newPassword, confirmPassword }));
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
                  locale="es-ES"
                  DateTimeFormat={Intl.DateTimeFormat}
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
            {
              !this.props.isMedico ? (
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
                        this.state.contacts && this.state.contacts.map((c, i) => (
                          <TableRow selected={this.isSelected(i)} key={i}>
                            <TableRowColumn>{c.firstName}</TableRowColumn>
                            <TableRowColumn>{c.lastName}</TableRowColumn>
                            <TableRowColumn>{c.phoneNumber}</TableRowColumn>
                          </TableRow>
                        ))
                      }
                    </TableBody>
                  </Table>
                  <CardActions style={{ display: 'flex', justifyContent: 'left', flexDirection: 'row' }}>
                    <RaisedButton
                      label="Agregar"
                      onTouchTap={this.handleOpenContactDialog}
                      primary
                    />
                    {
                      this.state.selected.length ? (
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
                      ) : ''
                    }
                  </CardActions>
                </Card>
              ) : null
            }
            <Card style={{ margin: '20px' }}>
              <CardTitle
                title="Cambiar Contraseña"
              />
              <CardText>
                <TextField
                  onChange={(e, password) => this.setState({ password })}
                  hintText="Contraseña"
                  type="password"
                  errorText={this.state.passwordError}
                  floatingLabelText="Contraseña"
                  fullWidth
                />
                <TextField
                  onChange={(e, newPassword) => this.setState({ newPassword })}
                  hintText="Contraseña"
                  type="password"
                  errorText={this.state.newPasswordError}
                  floatingLabelText="Nueva Contraseña"
                  fullWidth
                />
                {this.state.newPasswordError ? (<CardText color="gray">
                  La contraseña debe ser distinta a la contraseña actual y debe contener:<br />
                  • Una letra mayúscula<br />
                  • Una letra minúscula<br />
                  • Un número<br />
                  • Un caracter especial !@#&/()?¿¡$%<br />
                  • Al menos 8 caracteres </CardText>) : ''
                }
                <TextField
                  onChange={(e, confirmPassword) => this.setState({ confirmPassword })}
                  hintText="Contraseña"
                  type="password"
                  errorText={this.state.confirmPasswordError}
                  floatingLabelText="Confirmar Contraseña"
                  fullWidth
                />
              </CardText>
              <CardActions style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
                <RaisedButton
                  label="Cambiar"
                  onTouchTap={this.handleChangePassword}
                  primary
                />
              </CardActions>
            </Card>
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
