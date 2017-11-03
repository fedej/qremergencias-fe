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

import {
  isEmptyString,
  isOnlyString,
} from '../../../utils/validations';
import { correctDate } from '../../../utils/dateformat';

function validarFecha(date) {
  const fecha = moment().utc().toDate();
  return date > fecha;
}

export default class Cirugias extends React.Component {
  static defaultProps = {
    surgeries: [],
  }

  static propTypes = {
    surgeries: PropTypes.arrayOf(PropTypes.shape({
      date: PropTypes.date,
    })).isRequired,
    onSurgeriesChange: PropTypes.func.isRequired,
  }

  state = {
    selected: [],
    selectedIndex: '',
    dialogOpened: false,
    reason: '',
    reasonError: '',
    institution: '',
    institutionError: '',
    date: null,
    dateError: '',
    surgeries: [],
  }

  isSelected = (index) => {
    const result = this.state.selected.indexOf(index) !== -1;
    return result;
  };

  handleDialogData = () => {
    const { date, reason, institution, selectedIndex } = this.state;

    if (isEmptyString(reason)) {
      this.setState({ reasonError: 'Ingrese tipo.' });
    } else if (isEmptyString(institution)) {
      this.setState({ reasonError: '', institutionError: 'Ingrese un establecimiento válido.' });
    } else if (!date) {
      this.setState({ reasonError: '', institutionError: '', dateError: 'Ingrese una fecha.' });
    } else {
      this.setState({ reasonError: '', institutionError: '', dateError: '' });

      let surgeries = this.props.surgeries.slice();

      if (selectedIndex === '') {
        surgeries.push({
          date,
          reason,
          institution,
          type: 'cirugia',
        });
      } else {
        surgeries = this.props.surgeries;
        surgeries[selectedIndex].date = date;
        surgeries[selectedIndex].reason = reason;
        surgeries[selectedIndex].institution = institution;
      }
      this.props.onSurgeriesChange(surgeries);
      this.setState({ dialogOpened: false });
      this.setState({ date: '', reason: '', institution: '', selectedIndex: '' });
    }
  }

  formatDate = (date) => {
    const string = moment.utc(date).format('DD / MM / YYYY');
    return string;
  };

  handleOpenDialog = () => {
    const { selected } = this.state;
    const { surgeries } = this.props;
    if (selected.length) {
      const selectedIndex = selected[0];
      this.setState({
        dialogOpened: true,
        date: surgeries[selected].date,
        reason: surgeries[selected].reason,
        institution: surgeries[selected].institution,
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

  handleDeleteSurgery = (key) => {
    const surgeries = this.props.surgeries;
    surgeries.splice(key, 1);
    this.props.onSurgeriesChange(surgeries);
    this.setState({ selected: [] });
  };

  handleCloseDialog = () => {
    this.setState({ dialogOpened: false });
    this.setState({ date: '', reason: '', institution: '' });
    this.setState({ reasonError: '', institutionError: '', dateError: '' });
  };

  render() {
    const surgeries = this.props.surgeries;
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
          <CardTitle title="Cirugías" />
          <CardText>
            <Table onRowSelection={this.handleRowSelection}>
              <TableHeader>
                <TableRow>
                  <TableHeaderColumn>Fecha</TableHeaderColumn>
                  <TableHeaderColumn>Motivo</TableHeaderColumn>
                  <TableHeaderColumn>Establecimiento</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              {surgeries ? (
                <TableBody>
                  {
                    surgeries.map((p, i) => (
                      <TableRow selected={this.isSelected(i)} key={i}>
                        <TableRowColumn>{moment(p.date).format('DD / MM / YYYY')}</TableRowColumn>
                        <TableRowColumn>{p.reason}</TableRowColumn>
                        <TableRowColumn>{p.institution}</TableRowColumn>
                      </TableRow>
                    ))
                  }
                </TableBody>
              ) : ''}
            </Table>
          </CardText>
          <Dialog
            open={this.state.dialogOpened}
            title="Detalle de Cirugía"
            modal
            actions={actions}
          >
            <DatePicker
              value={correctDate(this.state.date)}
              shouldDisableDate={validarFecha}
              textFieldStyle={{ width: '100%' }}
              hintText="Fecha"
              onChange={(e, date) => this.setState({ date })}
              errorText={this.state.dateError}
              formatDate={this.formatDate}
              locale="es-ES"
              DateTimeFormat={Intl.DateTimeFormat}
            />
            <TextField
              value={this.state.reason}
              errorText={this.state.reasonError}
              onChange={(e, reason) => this.setState({ reason })}
              hintText="Motivo"
              type="text"
              floatingLabelText="Motivo"
              fullWidth
            />
            <TextField
              value={this.state.institution}
              errorText={this.state.institutionError}
              onChange={(e, institution) => this.setState({ institution })}
              hintText="Establecimiento"
              type="text"
              floatingLabelText="Establecimiento"
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
                  onTouchTap={() => this.handleDeleteSurgery(this.state.selected[0])}
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
