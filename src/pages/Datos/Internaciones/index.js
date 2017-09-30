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

export default class Internaciones extends React.Component {

  static defaultProps = {
    hospitalizations: [],
  }

  static propTypes = {
    hospitalizations: PropTypes.arrayOf(PropTypes.shape({
      date: PropTypes.date,
    })).isRequired,
    onHospitalizationsChange: PropTypes.func.isRequired,
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
    hospitalizations: [],
  }

  isSelected = (index) => {
    const result = this.state.selected.indexOf(index) !== -1;
    return result;
  };

  handleDialogData = () => {
    const { date, reason, institution, selectedIndex } = this.state;

    if (reason === '') {
      this.setState({ reasonError: 'Ingrese tipo.' });
    } else if (institution === '') {
      this.setState({ reasonError: '', institutionError: 'Ingrese una descripción.' });
    } else if (!date) {
      this.setState({ reasonError: '', institutionError: '', dateError: 'Ingrese una fecha.' });
    } else {
      this.setState({ reasonError: '', institutionError: '', dateError: '' });

      let hospitalizations = this.props.hospitalizations.slice();

      if (selectedIndex === '') {
        hospitalizations.push({
          date,
          reason,
          institution,
          type: 'ADMISSION',
        });
      } else {
        hospitalizations = this.props.hospitalizations;
        hospitalizations[selectedIndex].date = date;
        hospitalizations[selectedIndex].reason = reason;
        hospitalizations[selectedIndex].institution = institution;
      }
      this.props.onHospitalizationsChange(hospitalizations);
      this.setState({ dialogOpened: false });
      this.setState({ date: '', reason: '', institution: '', selectedIndex: '' });
    }
  }

  handleOpenDialog = () => {
    const { selected } = this.state;
    const { hospitalizations } = this.props;
    if (selected.length) {
      const selectedIndex = selected[0];
      this.setState({
        dialogOpened: true,
        date: hospitalizations[selected].date,
        reason: hospitalizations[selected].reason,
        institution: hospitalizations[selected].institution,
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

  handleDeleteHospitalization = (key) => {
    const hospitalizations = this.props.hospitalizations;
    hospitalizations.splice(key, 1);
    this.props.onHospitalizationsChange(hospitalizations);
    this.setState({ selected: [] });
  };

  handleCloseDialog = () => {
    this.setState({ dialogOpened: false });
    this.setState({ date: '', reason: '', institution: '' });
  };

  render() {
    const hospitalizations = this.props.hospitalizations;
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
          <CardTitle title="Internaciones" />
          <CardText>
            <Table onRowSelection={this.handleRowSelection}>
              <TableHeader>
                <TableRow>
                  <TableHeaderColumn>Fecha</TableHeaderColumn>
                  <TableHeaderColumn>Motivo</TableHeaderColumn>
                  <TableHeaderColumn>Establecimiento</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  hospitalizations && hospitalizations.length && hospitalizations.map((p, i) =>
                    (
                      <TableRow selected={this.isSelected(i)} key={i}>
                        <TableRowColumn>
                          {moment(p.date).format('DD / MM / YYYY')}
                        </TableRowColumn>
                        <TableRowColumn>{p.reason}</TableRowColumn>
                        <TableRowColumn>{p.institution}</TableRowColumn>
                      </TableRow>
                    ),
                  )
                }
              </TableBody>
            </Table>
          </CardText>
          <Dialog
            open={this.state.dialogOpened}
            title="Detalle de Hospitalizacion"
            modal
            actions={actions}
          >
            <DatePicker
              value={this.state.date}
              textFieldStyle={{ width: '100%' }}
              hintText="Fecha"
              onChange={(e, date) => this.setState({ date })}
              errorText={this.state.dateError}
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
                  onTouchTap={() => this.handleDeleteHospitalization(this.state.selected[0])}
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
