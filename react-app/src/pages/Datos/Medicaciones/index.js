import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { TextField, RaisedButton, DatePicker } from 'material-ui';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import classnames from 'classnames';

export default class Medicaciones extends React.Component {
  render() {
    return (
      <div className={classnames('formCenter')}>
        <Card style={{ margin: '20px' }}>
          <CardTitle title="Cirugias"/>
          <CardText>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>Nombre</TableHeaderColumn>
                <TableHeaderColumn>Descripcion</TableHeaderColumn>
                <TableHeaderColumn>Cantidad</TableHeaderColumn>
                <TableHeaderColumn>Periodo</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableRowColumn>Cafe veloz</TableRowColumn>
                <TableRowColumn>La que toma Maradona</TableRowColumn>
                <TableRowColumn>8</TableRowColumn>
                <TableRowColumn>Mensualmente</TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
          </CardText>
          <CardActions style={{ display: 'flex', justifyContent: 'left', flexDirection: 'row' }}>
            <RaisedButton
              label="Agregar"
              onTouchTap={this.handleOpenContactDialog}
              primary
            />
            <RaisedButton
              label="Editar"
              onTouchTap={this.handleOpenContactDialog}
              primary
            />
            <RaisedButton
              label="Borrar"
              onTouchTap={this.handleOpenContactDialog}
              primary
            />
          </CardActions>
        </Card>
      </div>
    );
  }
}
