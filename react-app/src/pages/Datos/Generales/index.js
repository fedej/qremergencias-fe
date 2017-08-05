import React from 'react';
import Home from '../../Home';
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

  handleChange = (event, index, value) => console.log(value);

  render() {
    return (
      <div className={classnames('formCenter')}>
        <Card style={{ margin: '20px' }}>
          <CardTitle title="Datos generales de emergencia"/>
            <CardText>
              <SelectField
                floatingLabelText="Grupo Sanguineo"
                floatingLabelFixed={true}>
                {items}
              </SelectField>
              <Toggle
                label="¿Es donante de órganos?"
                style={styles.toggle}
              />
              <Toggle
                label="¿Es alérgico?"
                style={styles.toggle}
              />
              <Chip onRequestDelete={handleDeleteAlergia} onTouchTap={handleTouchAlergia} style={styles.chip}>
                Estudiar
              </Chip>
              <Chip onRequestDelete={handleDeleteAlergia} onTouchTap={handleTouchAlergia} style={styles.chip}>
                Jazmines
              </Chip>
            </CardText>
        </Card>
      </div>
    );
  }
}
