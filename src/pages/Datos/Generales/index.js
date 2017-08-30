import React from 'react';
import PropTypes from 'prop-types';
import { TextField, RaisedButton } from 'material-ui';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import classnames from 'classnames';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import Chip from 'material-ui/Chip';

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

const styles = {
  block: {
    maxWidth: 250,
  },
  toggle: {
    marginBottom: 16,
  },
  chip: {
    margin: 4,
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
    }),
    onGeneralChange: PropTypes.func.isRequired,
  }

  state = {
    allergy: '',
  }

  handleBloodTypeChange = (event, index, value) => {
    const general = this.props.general;
    general.bloodType = value;
    this.props.onGeneralChange(general);
  }

  handleOrganDonorChange = (event, isInputChecked) => {
    const general = this.props.general;
    general.organDonor = isInputChecked;
    this.props.onGeneralChange(general);
  }

  handleAddAllergy = () => {
    const general = this.props.general;
    const { allergy } = this.state;

    if (allergy) {
      if (!general.allergies) {
        general.allergies = [];
      }

      general.allergies.push(allergy);
      this.props.onGeneralChange(general);
      this.setState({ allergy: '' });
    }
  }

  handleDeleteAllergy = (key) => {
    const general = this.props.general;
    general.allergies.splice(key, 1);
    this.props.onGeneralChange(general);
  }

  handleAllergyChange = (event) => {
    this.setState({ allergy: event.target.value });
  }

  render() {
    const general = this.props.general;
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
                  <TextField
                    type="text"
                    value={this.state.allergy}
                    floatingLabelText="¿A que es alérgico?"
                    onChange={this.handleAllergyChange}
                    floatingLabelFixed
                  />
                </td>
                <td>
                  <RaisedButton
                    label="Agregar"
                    onTouchTap={this.handleAddAllergy}
                    primary
                  />
                </td>
              </tr>
            </table>
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
          </CardText>
        </Card>
      </div>
    );
  }
}
