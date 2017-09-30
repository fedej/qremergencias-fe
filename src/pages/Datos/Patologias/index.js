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


const pathologyType = [
  <MenuItem key={1} value={'ASTHMA'} primaryText="ASMA" />,
  <MenuItem key={2} value={'HYPERTENSION'} primaryText="HIPERTENSIÓN" />,
  <MenuItem key={3} value={'ONCOLOGICAL_BACKGROUND'} primaryText="ANTECEDENTE ONCOLÓGICO" />,
  <MenuItem key={4} value={'RENAL_INSUFFICIENCY'} primaryText="INSUFICIENCIA SUPRARENAL" />,
  <MenuItem key={5} value={'OTHER'} primaryText="OTRO" />,
];


export default class Patologias extends React.Component {

  static defaultProps = {
    pathologies: [],
  }

  static propTypes = {
    pathologies: PropTypes.array,
    onPathologiesChange: PropTypes.func.isRequired,
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

  handleDialogData = () => {
    const { type, description, date, selectedIndex } = this.state;

    if (type === '') {
      this.setState({ typeError: 'Ingrese tipo.' });
    } else if (description === '' && type === 'OTHER') {
      this.setState({ typeError: '', descriptionError: 'Ingrese una descripción.' });
    } else if (!date) {
      this.setState({ typeError: '', descriptionError: '', dateError: 'Ingrese una fecha.' });
    } else {
      this.setState({ typeError: '', descriptionError: '', dateError: '' });

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

  handleDeletePathology = (key) => {
    const pathologies = this.props.pathologies;
    pathologies.splice(key, 1);
    this.props.onPathologiesChange(pathologies);
    this.setState({ selected: [] });
  };

  handleCloseDialog = () => {
    this.setState({ dialogOpened: false });
    this.setState({ type: '', description: '', date: '' });
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
          <CardTitle title="Patologias" />
          <CardText>
            <Table onRowSelection={this.handleRowSelection}>
              <TableHeader>
                <TableRow>
                  <TableHeaderColumn>Tipo</TableHeaderColumn>
                  <TableHeaderColumn>Descripcion</TableHeaderColumn>
                  <TableHeaderColumn>Fecha</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  pathologies && pathologies.length && pathologies.map((p, i) =>
                    (<TableRow selected={this.isSelected(i)} key={i}>
                      <TableRowColumn>{p.type}</TableRowColumn>
                      <TableRowColumn>{p.description}</TableRowColumn>
                      <TableRowColumn>{moment(p.date).format('DD / MM / YYYY')}</TableRowColumn>
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
            <SelectField
              value={this.state.type}
              floatingLabelText="Tipo de patología"
              onChange={(e, key, type) => this.setState({ type, description: '' })}
              floatingLabelFixed
              errorText={this.state.typeError}
            >
              {pathologyType}
            </SelectField>
            <TextField
              value={this.state.description}
              errorText={this.state.descriptionError}
              disabled={this.state.type !== 'OTHER'}
              onChange={(e, description) => this.setState({ description })}
              hintText="Descripción"
              type="text"
              floatingLabelText="Descripción"
              fullWidth
            />
            <DatePicker
              value={this.state.date}
              textFieldStyle={{ width: '100%' }}
              hintText="Fecha"
              onChange={(e, date) => this.setState({ date })}
              errorText={this.state.dateError}
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
