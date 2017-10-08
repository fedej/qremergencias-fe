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

export default class Internaciones extends React.Component {

  static defaultProps = {
    hospitalizations: [],
  }

  static propTypes = {
    hospitalizations: PropTypes.arrayOf(PropTypes.shape({
      date: PropTypes.date,
    })).isRequired,
  }

  render() {
    const hospitalizations = this.props.hospitalizations;

    return (
      <div className={classnames('formCenter')}>
        <Card style={{ margin: '20px' }}>
          <CardTitle title="Internaciones" />
          <CardText>
            <Table onRowSelection={this.handleRowSelection}>
              <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                <TableRow>
                  <TableHeaderColumn>Fecha</TableHeaderColumn>
                  <TableHeaderColumn>Motivo</TableHeaderColumn>
                  <TableHeaderColumn>Establecimiento</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {
                  hospitalizations && hospitalizations.length && hospitalizations.map((p, i) =>
                    (
                      <TableRow key={i}>
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
        </Card>
      </div>
    );
  }
}
