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
import { Card, CardTitle, CardText } from 'material-ui/Card';
import classnames from 'classnames';
import moment from 'moment';

export default class Cirugias extends React.Component {

  static defaultProps = {
    surgeries: [],
  }

  static propTypes = {
    surgeries: PropTypes.arrayOf(PropTypes.shape({
      date: PropTypes.date,
    })).isRequired,
  }

  render() {
    const surgeries = this.props.surgeries;

    return (
      surgeries && surgeries.length ? (
        <div className={classnames('formCenter')}>
          <Card style={{ margin: '20px' }}>
            <CardTitle title="Cirugías" />
            <CardText>
              <Table onRowSelection={this.handleRowSelection}>
                <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                  <TableRow>
                    <TableHeaderColumn>Fecha</TableHeaderColumn>
                    <TableHeaderColumn>Motivo</TableHeaderColumn>
                    <TableHeaderColumn>Establecimiento</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                {surgeries ? (
                  <TableBody displayRowCheckbox={false}>
                    {
                      surgeries.map((p, i) => (
                        <TableRow key={i}>
                          <TableRowColumn>{moment.utc(p.date).format('DD / MM / YYYY')}</TableRowColumn>
                          <TableRowColumn>{p.reason}</TableRowColumn>
                          <TableRowColumn>{p.institution}</TableRowColumn>
                        </TableRow>
                      ))
                    }
                  </TableBody>
                ) : ''}
              </Table>
            </CardText>
          </Card>
        </div>) : (
          <div>
            <div className={classnames('formCenter')}>
              <h2>¡Parece ser que aún no tenés cirugías cargadas!</h2>
            </div>
            <div className={classnames('formCenter')}>
              <h2>Aquí podrás ver el listado de cirugías </h2>
            </div>
            <div className={classnames('formCenter')}>
              <h2>a medida que las vaya cargando un médico autorizado.</h2>
            </div>
          </div>
        )
    );
  }
}
