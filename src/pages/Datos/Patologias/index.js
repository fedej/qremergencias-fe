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
import { TextField, DatePicker, RaisedButton } from 'material-ui';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import classnames from 'classnames';
import moment from 'moment';
import Dialog from 'material-ui/Dialog';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';

import {
  isEmptyString,
  hasEmptyStringProperties,
} from '../../../utils/validations';

import { correctDate } from '../../../utils/dateformat';

const pathologyType = [
  { key: 'asma', value: 'asma' },
  { key: 'hipertension', value: 'hipertension' },
  { key: 'antecedentes_oncologicos', value: 'antecedentes oncologicos' },
  { key: 'insuficiencia_suprarrenal', value: 'insuficiencia suprarrenal' },
  { key: 'otro', value: 'otro' },
];


function validarFecha(date) {
  const fecha = moment().utc().toDate();
  return date > fecha;
}

export default class Patologias extends React.Component {
  static defaultProps = {
    pathologies: [],
  }

  static propTypes = {
    pathologies: PropTypes.arrayOf(PropTypes.shape({})),
    onPathologiesChange: PropTypes.func.isRequired,
    onQRUpdateRequiredChange: PropTypes.func.isRequired,
  }

  state = {
    selected: [],
    selectedIndex: '',
    dialogOpened: false,
    type: '',
    typeError: '',
    description: '',
    decriptionError: '',
    date: null,
    dateError: '',
    pathologies: [],
  }

  isSelected = (index) => {
    const result = this.state.selected.indexOf(index) !== -1;
    return result;
  };

  checkDuplicate = (type, description, selectedIndex, list) =>
    list.some((value, index) => selectedIndex !== index && value.type === type
      && (value.type !== 'otro' || value.description.toUpperCase() === description.toUpperCase()));

  handleDialogData = () => {
    const { type, description, date, selectedIndex } = this.state;
    const errores = {};

    errores.typeError = (isEmptyString(type)) ?
      'Ingrese tipo.' : '';
    errores.descriptionError = (type === 'otro' && isEmptyString(description)) ?
      'Ingrese una descripción.' : '';
    errores.dateError = (!date) ?
      'Ingrese una fecha.' : '';
    if (errores.nameError === '' && errores.descriptionError === '') {
      if (this.checkDuplicate(type, description, selectedIndex, this.props.pathologies)) {
        errores.typeError = (type !== 'otro') ? 'La patología ya fue agregada, por favor ingrese otra' : '';
        errores.descriptionError = (type === 'otro') ? 'La patología ya fue agregada, por favor ingrese otra' : '';
      }
    }

    this.setState(errores);
    if (hasEmptyStringProperties(errores)) {
      const pathos = this.props.pathologies.slice();

      if (selectedIndex === '') {
        pathos.push({
          type,
          description,
          date,
        });
      } else {
        pathos[selectedIndex].type = type;
        pathos[selectedIndex].description = description;
        pathos[selectedIndex].date = date;
      }
      if (type !== 'otro') {
        this.props.onQRUpdateRequiredChange(true);
      }
      this.props.onPathologiesChange(pathos);
      this.setState({ dialogOpened: false });
      this.setState({ type: '', description: '', date: '', selectedIndex: '' });
    }
  }

  handleOpenDialog = () => {
    const { selected } = this.state;
    const { pathologies } = this.props;
    if (selected.length) {
      const selectedIndex = selected[0];
      this.setState({
        dialogOpened: true,
        type: pathologies[selected].type,
        description: pathologies[selected].description,
        date: pathologies[selected].date,
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

  formatDate = (date) => {
    const string = moment.utc(date).format('DD / MM / YYYY');
    return string;
  };

  handleDeletePathology = (key) => {
    const pathologies = this.props.pathologies;
    if (pathologies[key].type !== 'otro') {
      this.props.onQRUpdateRequiredChange(true);
    }
    pathologies.splice(key, 1);
    this.props.onPathologiesChange(pathologies);
    this.setState({ selected: [] });
  };

  handleCloseDialog = () => {
    this.setState({ dialogOpened: false });
    this.setState({ type: '', description: '', date: '' });
    this.setState({ typeError: '', descriptionError: '', dateError: '' });
  };

  render() {
    const pathologies = this.props.pathologies;
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
          <CardTitle title="Patologías" />
          <CardText>
            <Table onRowSelection={this.handleRowSelection}>
              <TableHeader>
                <TableRow>
                  <TableHeaderColumn>Fecha</TableHeaderColumn>
                  <TableHeaderColumn>Tipo</TableHeaderColumn>
                  <TableHeaderColumn>Descripción</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  pathologies && pathologies.length && pathologies.map((p, i) =>
                    (<TableRow selected={this.isSelected(i)} key={i}>
                      <TableRowColumn>{moment(p.date).format('DD / MM / YYYY')}</TableRowColumn>
                      <TableRowColumn>
                        {pathologyType.find(pathology => pathology.key === p.type).value}
                      </TableRowColumn>
                      <TableRowColumn>{p.description}</TableRowColumn>
                    </TableRow>),
                  )
                }
              </TableBody>
            </Table>
          </CardText>
          <Dialog
            open={this.state.dialogOpened}
            title="Detalle de Patología"
            modal
            actions={actions}
          >
            <DatePicker
              value={correctDate(this.state.date)}
              textFieldStyle={{ width: '100%' }}
              shouldDisableDate={validarFecha}
              hintText="Fecha"
              onChange={(e, date) => this.setState({ date })}
              errorText={this.state.dateError}
              locale="es-ES"
              formatDate={this.formatDate}
              DateTimeFormat={Intl.DateTimeFormat}
            />
            <SelectField
              value={this.state.type}
              floatingLabelText="Tipo de patología"
              onChange={(e, key, type) => this.setState({ type, description: '' })}
              floatingLabelFixed
              errorText={this.state.typeError}
            >
              {pathologyType.map(pathology => (
                <MenuItem
                  key={pathology.key}
                  value={pathology.key}
                  primaryText={pathology.value}
                />
              ))}
            </SelectField>
            <TextField
              value={this.state.description}
              errorText={this.state.descriptionError}
              disabled={this.state.type !== 'otro'}
              onChange={(e, description) => this.setState({ description })}
              hintText="Descripción"
              type="text"
              floatingLabelText="Descripción"
              fullWidth
            />
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
                  onTouchTap={() => this.handleDeletePathology(this.state.selected[0])}
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
