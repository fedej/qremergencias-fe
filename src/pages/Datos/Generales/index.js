import React from 'react';
import PropTypes from 'prop-types';
import { TextField, RaisedButton, DatePicker } from 'material-ui';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import classnames from 'classnames';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import moment from 'moment';
import Chip from 'material-ui/Chip';

import {
  isEmptyString,
} from '../../../utils/validations';

import { correctDate } from '../../../utils/dateformat';

function validarFecha(date) {
  const fecha = moment().utc().toDate();
  return date > fecha;
}

const items = [
  <MenuItem key={1} value={'A+'} primaryText="A+" />,
  <MenuItem key={2} value={'A-'} primaryText="A-" />,
  <MenuItem key={3} value={'B+'} primaryText="B+" />,
  <MenuItem key={4} value={'B-'} primaryText="B-" />,
  <MenuItem key={5} value={'AB+'} primaryText="AB+" />,
  <MenuItem key={6} value={'AB-'} primaryText="AB-" />,
  <MenuItem key={7} value={'0+'} primaryText="0+" />,
  <MenuItem key={8} value={'0-'} primaryText="0-" />,
];

const basicAllergies = [
  {
    key: 'penicilina',
    value: 'penicilina',
  },
  {
    key: 'insulina',
    value: 'insulina',
  },
  {
    key: 'rayos_x_con_yodo',
    value: 'rayos x con yodo',
  },
  {
    key: 'sulfamidas',
    value: 'sulfamidas',
  },
  {
    key: 'otro',
    value: 'otro',
  },
];

const styles = {
  block: {
    maxWidth: 250,
  },
  toggle: {
    marginBottom: 16,
  },
  chip: {
    margin: 4,
    display: 'inline-flex',
    marginRight: '3px',
    marginBottom: '5px',
    alignItems: 'center',
  },
};

export default class Generales extends React.Component {

  static defaultProps = {
    general: {},
  }

  static propTypes = {
    general: PropTypes.shape({
      bloodType: PropTypes.string,
      organDonor: PropTypes.bool,
      allergic: PropTypes.bool,
      allergies: PropTypes.array,
      lastMedicalCheck: PropTypes.date,
    }),
    onQRUpdateRequiredChange: PropTypes.func.isRequired,
    onGeneralChange: PropTypes.func.isRequired,
  }

  state = {
    allergyBasic: '',
    allergyDescription: '',
    descriptionError: '',
  }

  handleBloodTypeChange = (event, index, value) => {
    const { general } = this.props;
    general.bloodType = value;
    this.props.onQRUpdateRequiredChange(true);
    this.props.onGeneralChange(general);
  }

  handleOrganDonorChange = (event, isInputChecked) => {
    const general = this.props.general;
    general.organDonor = isInputChecked;
    this.props.onGeneralChange(general);
  }

  handleAddAllergy = () => {
    const general = this.props.general;
    const { allergyBasic, allergyDescription } = this.state;
    let allergy = '';

    if (this.state.allergyBasic !== 'otro') {
      const alergia = basicAllergies.find(a => a.value === allergyBasic);
      allergy = alergia.key;
      this.props.onQRUpdateRequiredChange(true);
    } else if (!isEmptyString(this.state.allergyDescription)) {
      allergy = this.state.allergyDescription.trim();
    } else {
      this.setState({ descriptionError: 'Ingrese una descripcion válida.' });
      return;
    }

    if (allergy) {
      if (!general.allergies) {
        general.allergies = [];
      }
      if (general.allergies.indexOf(allergy) === -1) {
        general.allergies.push(allergy);
        this.props.onGeneralChange(general);
        this.setState({ allergyBasic: '', descriptionError: '', allergyDescription: '' });
      }
    }
  }

  handleDeleteAllergy = (key) => {
    const general = this.props.general;
    const b = basicAllergies.find(a => a.value === general.allergies[key]);
    if (b !== undefined) {
      this.props.onQRUpdateRequiredChange(true);
    }
    general.allergies.splice(key, 1);
    this.props.onGeneralChange(general);
  }

  handleLastMedicalCheck = (e, date) => {
    const { general } = this.props;
    const newGeneral = { ...general };
    newGeneral.lastMedicalCheck = date.toISOString();
    this.props.onGeneralChange(newGeneral);
  }

  formatDate = (date) => {
    const string = moment.utc(date).format('DD / MM / YYYY');
    return string;
  };

  render() {
    const { general } = this.props;
    const lastMedicalCheck = general.lastMedicalCheck ? new Date(general.lastMedicalCheck) : null;
    return (
      <div className={classnames('formCenter')}>
        <Card style={{ margin: '20px' }}>
          <CardTitle title="Datos generales de emergencia" />
          <CardText>
            <SelectField
              value={general.bloodType}
              floatingLabelText="Grupo Sanguineo"
              onChange={this.handleBloodTypeChange}
              floatingLabelFixed
            >
              {items}
            </SelectField>
            <tr>
              <DatePicker
                value={correctDate(lastMedicalCheck)}
                textFieldStyle={{ width: '100%' }}
                hintText="Fecha último chequeo"
                shouldDisableDate={validarFecha}
                onChange={this.handleLastMedicalCheck}
                locale="es-ES"
                formatDate={this.formatDate}
                DateTimeFormat={Intl.DateTimeFormat}
              />
            </tr>
            <Toggle
              toggled={general.organDonor}
              label="¿Es donante de órganos?"
              onToggle={this.handleOrganDonorChange}
              style={styles.toggle}
            />
            <Toggle
              toggled={general.allergic}
              label="¿Es alérgico?"
              style={styles.toggle}
            />
            <table>
              <tr>
                <td>
                  <SelectField
                    value={this.state.allergyBasic}
                    floatingLabelText="¿A que es alérgico?"
                    onChange={(e, key, allergyBasic) => {
                      this.setState({ allergyBasic, allergyDescription: '' });
                    }}
                    floatingLabelFixed
                  >
                    {
                      basicAllergies.map((allergy, index) => (
                        <MenuItem
                          key={allergy.key}
                          value={allergy.value}
                          primaryText={allergy.value}
                        />
                      ))
                    }
                  </SelectField>
                  <br />
                  <TextField
                    type="text"
                    disabled={this.state.allergyBasic !== 'otro'}
                    value={this.state.allergyDescription}
                    onChange={(e, allergyDescription) => this.setState({ allergyDescription })}
                    floatingLabelText="Descripción"
                    errorText={this.state.descriptionError}
                    floatingLabelFixed
                  />
                  <br />
                  <RaisedButton
                    label="Agregar"
                    onTouchTap={this.handleAddAllergy}
                    primary
                  />
                </td>
              </tr>
            </table>
            <br />
            <br />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
            {
              general.allergies ? general.allergies.map((texto, i) => (
                <Chip
                  onRequestDelete={() => this.handleDeleteAllergy(i)}
                  key={i}
                  style={styles.chip}
                >
                  {texto}
                </Chip>
              ),
              ) : ''
            }
            </div>
          </CardText>
        </Card>
      </div>
    );
  }
}
