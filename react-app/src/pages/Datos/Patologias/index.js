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

export default class Patologias extends React.Component {

  static defaultProps = {
    patologias: {},
  }

  static propTypes = {
    patologias: PropTypes.array,
  }

  state = {
    showError: false,
    selected: [],
    selectedIndex: '',
  }

  handleRowSelection = (selectedRows) => {
    this.setState({
      selected: selectedRows,
    });
  };

  render() {
    const patologias = this.props.patologias;
    return (
      <div className={classnames('formCenter')}>
        <Card style={{ margin: '20px' }}>
          <CardTitle title="Patologias"/>
          <CardText>
          <Table onRowSelection={this.handleRowSelection}>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>Tipo</TableHeaderColumn>
                <TableHeaderColumn>Descripcion</TableHeaderColumn>
                <TableHeaderColumn>Fecha</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            {patologias ? (
              <TableBody>
                {
                  patologias.map((p, i) =>
                    (<TableRow selected={this.isSelected(i)}>
                      <TableRowColumn>{p.tipo}</TableRowColumn>
                      <TableRowColumn>{p.descripcion}</TableRowColumn>
                      <TableRowColumn>{p.fecha}</TableRowColumn>
                    </TableRow>),
                  )
                }
              </TableBody>
            ) : ''}
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
