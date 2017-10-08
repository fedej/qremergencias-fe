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


export default class Patologias extends React.Component {

  static defaultProps = {
    pathologies: [],
  }

  static propTypes = {
    pathologies: PropTypes.arrayOf(PropTypes.shape({})),
  }

  render() {
    const pathologies = this.props.pathologies;

    return (
      <div className={classnames('formCenter')}>
        <Card style={{ margin: '20px' }}>
          <CardTitle title="Patologías" />
          <CardText>
            <Table>
              <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                <TableRow>
                  <TableHeaderColumn>Tipo</TableHeaderColumn>
                  <TableHeaderColumn>Descripcion</TableHeaderColumn>
                  <TableHeaderColumn>Fecha</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {
                  pathologies && pathologies.length && pathologies.map((p, i) =>
                    (<TableRow key={i}>
                      <TableRowColumn>{p.type}</TableRowColumn>
                      <TableRowColumn>{p.description}</TableRowColumn>
                      <TableRowColumn>{moment(p.date).format('DD / MM / YYYY')}</TableRowColumn>
                    </TableRow>),
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
