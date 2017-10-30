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
      </div>
    );
  }
}
