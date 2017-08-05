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

export default class Patologias extends React.Component {
  render() {
    return (
      <div className={classnames('formCenter')}>
        <Card style={{ margin: '20px' }}>
          <CardTitle title="Patologias"/>
          <CardText>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>Tipo</TableHeaderColumn>
                <TableHeaderColumn>Descripcion</TableHeaderColumn>
                <TableHeaderColumn>Fecha</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableRowColumn>Cardiovascular</TableRowColumn>
                <TableRowColumn>Infarto</TableRowColumn>
                <TableRowColumn>02/12/2013</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Respiratorio</TableRowColumn>
                <TableRowColumn>Asma</TableRowColumn>
                <TableRowColumn>10/10/2007</TableRowColumn>
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
