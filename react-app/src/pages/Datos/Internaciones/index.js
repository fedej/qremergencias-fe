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

export default class Internaciones extends React.Component {
  render() {
    return (
      <div className={classnames('formCenter')}>
        <Card style={{ margin: '20px' }}>
          <CardTitle title="Internaciones"/>
          <CardText>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>Fecha</TableHeaderColumn>
                <TableHeaderColumn>Motivo</TableHeaderColumn>
                <TableHeaderColumn>Establecimiento</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableRowColumn>08/11/2014</TableRowColumn>
                <TableRowColumn>Lobotomia frontal erronea</TableRowColumn>
                <TableRowColumn>Clinica San Camilo</TableRowColumn>
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
