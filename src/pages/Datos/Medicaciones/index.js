import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { TextField, RaisedButton } from 'material-ui';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import classnames from 'classnames';
import Dialog from 'material-ui/Dialog';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';

import {
  isEmptyString,
  hasEmptyStringProperties,
} from '../../../utils/validations';

const periodsMapping = {
  diariamente: 'DIARIAMENTE',
  semanalmente: 'SEMANALMENTE',
  mensualmente: 'MENSUALMENTE',
};

const periods = [
  <MenuItem
    key={1}
    value={periodsMapping.diariamente.toLowerCase()}
    primaryText={periodsMapping.diariamente}
  />,
  <MenuItem
    key={2}
    value={periodsMapping.semanalmente.toLowerCase()}
    primaryText={periodsMapping.semanalmente}
  />,
  <MenuItem
    key={3}
    value={periodsMapping.mensualmente.toLowerCase()}
    primaryText={periodsMapping.mensualmente}
  />,
];

export default class Medicaciones extends React.Component {

  static defaultProps = {
    medications: [],
  }

  static propTypes = {
    medications: PropTypes.arrayOf(PropTypes.shape({})),
    onMedicationChange: PropTypes.func.isRequired,
  }

  state = {
    selected: [],
    selectedIndex: '',
    dialogOpened: false,
    name: '',
    nameError: '',
    description: '',
    decriptionError: '',
    amount: '',
    amountError: '',
    period: '',
    periodError: '',
    medications: [],
  }

  isSelected = (index) => {
    const result = this.state.selected.indexOf(index) !== -1;
    return result;
  };

  checkDuplicate = (name, selectedIndex, list) =>
    list.some((value, index) => selectedIndex !== index &&
     value.name.toUpperCase() === name.toUpperCase());

  handleDialogData = () => {
    const { name, description, amount, period, selectedIndex } = this.state;
    const errores = {};

    errores.nameError = (isEmptyString(name)) ?
      'Ingrese un nombre.' : '';
    errores.descriptionError = (isEmptyString(description)) ?
      'Ingrese una descripción.' : '';
    errores.amountError = (isEmptyString(amount)) ?
      'Ingrese una cantidad.' : '';
    errores.periodError = (isEmptyString(period)) ?
      'Ingrese una fecha.' : '';
    if (errores.nameError === '') {
      errores.nameError = (this.checkDuplicate(name, selectedIndex, this.props.medications)) ?
        'El medicamento ya fue agregado, por favor ingrese otro' : '';
    }

    this.setState(errores);
    if (hasEmptyStringProperties(errores)) {
      let medications = this.props.medications;

      if (selectedIndex === '') {
        medications.push({
          name,
          description,
          amount,
          period,
        });
      } else {
        medications = this.props.medications;
        medications[selectedIndex].name = name;
        medications[selectedIndex].description = description;
        medications[selectedIndex].amount = amount;
        medications[selectedIndex].period = period;
      }
      this.props.onMedicationChange(medications);
      this.setState({ dialogOpened: false });
      this.setState({ name: '', description: '', amount: '', period: '', selectedIndex: '' });
    }
  }

  handleOpenDialog = () => {
    const { selected } = this.state;
    const { medications } = this.props;
    if (selected.length) {
      const selectedIndex = selected[0];
      this.setState({
        dialogOpened: true,
        name: medications[selected].name,
        description: medications[selected].description,
        amount: medications[selected].amount,
        period: medications[selected].period,
        selectedIndex,
      });
    } else {
      this.setState({
        dialogOpened: true,
      });
    }
  };

  handleRowSelection = (selectedRows) => {
    this.setState({
      selected: selectedRows,
    });
  };

  handleDeleteMedication = (key) => {
    const medications = this.props.medications;
    medications.splice(key, 1);
    this.props.onMedicationChange(medications);
    this.setState({ selected: [] });
  };

  handleCloseDialog = () => {
    this.setState({ dialogOpened: false });
    this.setState({ name: '', description: '', amount: '', period: '' });
    this.setState({ nameError: '', descriptionError: '', amountError: '', periodError: '' });
  };

  render() {
    const medications = this.props.medications;
    const actions = [
      <RaisedButton
        label="Cancelar"
        onTouchTap={this.handleCloseDialog}
      />,
      <RaisedButton
        label="Aceptar"
        primary
        onTouchTap={this.handleDialogData}
      />,
    ];

    return (
      <div className={classnames('formCenter')}>
        <Card style={{ margin: '20px' }}>
          <CardTitle title="Medicaciones" />
          <CardText>
            <Table onRowSelection={this.handleRowSelection}>
              <TableHeader>
                <TableRow>
                  <TableHeaderColumn>Nombre</TableHeaderColumn>
                  <TableHeaderColumn>Descripción</TableHeaderColumn>
                  <TableHeaderColumn>Cantidad</TableHeaderColumn>
                  <TableHeaderColumn>Período</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  medications && medications.length && medications.map((m, i) =>
                    (<TableRow selected={this.isSelected(i)} key={i}>
                      <TableRowColumn>{m.name}</TableRowColumn>
                      <TableRowColumn>{m.description}</TableRowColumn>
                      <TableRowColumn>{m.amount}</TableRowColumn>
                      <TableRowColumn>{periodsMapping[m.period]}</TableRowColumn>
                    </TableRow>),
                  )
                }
              </TableBody>
            </Table>
          </CardText>
          <Dialog
            open={this.state.dialogOpened}
            title="Detalle de Medicación"
            modal
            actions={actions}
          >
            <TextField
              value={this.state.name}
              errorText={this.state.nameError}
              onChange={(e, name) => this.setState({ name })}
              hintText="Nombre"
              type="text"
              floatingLabelText="Nombre"
              fullWidth
            />
            <TextField
              value={this.state.description}
              errorText={this.state.descriptionError}
              onChange={(e, description) => this.setState({ description })}
              hintText="Descripción"
              type="text"
              floatingLabelText="Descripción"
              fullWidth
            />
            <TextField
              value={this.state.amount}
              errorText={this.state.amountError}
              onChange={(e, amount) => this.setState({ amount })}
              hintText="Cantidad"
              type="text"
              floatingLabelText="Cantidad"
              fullWidth
            />
            <SelectField
              value={this.state.period}
              floatingLabelText="Frecuencia"
              onChange={(e, key, period) => this.setState({ period })}
              floatingLabelFixed
              errorText={this.state.periodError}
            >
              {periods}
            </SelectField>
          </Dialog>
          <CardActions style={{ display: 'flex', justifyContent: 'left', flexDirection: 'row' }}>
            <RaisedButton
              label="Agregar"
              onTouchTap={this.handleOpenDialog}
              primary
            />
            {this.state.selected.length ? (
              <div>
                <RaisedButton
                  label="Editar"
                  onTouchTap={this.handleOpenDialog}
                  primary
                />
                &nbsp;&nbsp;
                <RaisedButton
                  label="Borrar"
                  onTouchTap={() => this.handleDeleteMedication(this.state.selected[0])}
                  primary
                />
              </div>
            ) : ''}
          </CardActions>
        </Card>
      </div>
    );
  }
}
