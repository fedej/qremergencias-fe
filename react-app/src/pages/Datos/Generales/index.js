import React from 'react';
import PropTypes from 'prop-types';
import { TextField, RaisedButton } from 'material-ui';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import classnames from 'classnames';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import Chip from 'material-ui/Chip';

const items = [
  <MenuItem key={1} value={1} primaryText="A+" />,
  <MenuItem key={2} value={2} primaryText="A-" />,
  <MenuItem key={3} value={3} primaryText="B+" />,
  <MenuItem key={4} value={4} primaryText="B-" />,
  <MenuItem key={5} value={5} primaryText="AB+" />,
  <MenuItem key={6} value={6} primaryText="AB-" />,
  <MenuItem key={7} value={7} primaryText="0+" />,
  <MenuItem key={8} value={8} primaryText="0-" />,
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

function handleDeleteAlergia() {
  alert('You clicked the delete button.');
}

function handleTouchAlergia() {
  alert('You clicked the Chip.');
}

export default class Generales extends React.Component {

  static defaultProps = {
    generales: {},
  }

  static propTypes = {
    generales: PropTypes.shape({
      bloodType: PropTypes.string,
      organDonor: PropTypes.bool,
      allergic: PropTypes.bool,
      allergies: PropTypes.array,
    }),
  }

  handleChange = (event, index, value) => console.log(value);

  render() {
    const generales = this.props.generales;
    console.log(this.props.generales);
    return (
      <div className={classnames('formCenter')}>
        <Card style={{ margin: '20px' }}>
          <CardTitle title="Datos generales de emergencia" />
          <CardText>
            <SelectField
              value={generales.bloodType}
              floatingLabelText="Grupo Sanguineo"
              onChange={this.handleChange}
              floatingLabelFixed
            >
              {items}
            </SelectField>
            <Toggle
              value={generales.organDonor}
              label="¿Es donante de órganos?"
              onChange={this.handleChange}
              style={styles.toggle}
            />
            <Toggle
              value={generales.allergic}
              label="¿Es alérgico?"
              onChange={this.handleChange}
              style={styles.toggle}
            />
            <table>
              <tr>
                <td>
                  <TextField
                    type="text"
                    floatingLabelText="¿A que es alérgico?"
                    onChange={this.handleChange}
                    floatingLabelFixed
                  />
                </td>
                <td>
                  <RaisedButton
                    label="Agregar"
                    onTouchTap={this.handleOpenContactDialog}
                    primary
                  />
                </td>
              </tr>
            </table>
            {
              generales.allergies ? generales.allergies.map((texto, i) => (
                <Chip
                  onRequestDelete={handleDeleteAlergia}
                  onTouchTap={handleTouchAlergia}
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
