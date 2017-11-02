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

const periodsMapping = {
  diariamente: 'DIARIAMENTE',
  semanalmente: 'SEMANALMENTE',
  mensualmente: 'MENSUALMENTE',
};

export default class Medicaciones extends React.Component {

  static defaultProps = {
    medications: [],
  }

  static propTypes = {
    medications: PropTypes.arrayOf(PropTypes.shape({})),
  }

  state = {
    selected: [],
    selectedIndex: '',
    dialogOpened: false,
    name: '',
    nameError: '',
    description: '',
    decriptionError: '',
    amount: '',
    amountError: '',
    period: '',
    periodError: '',
    medications: [],
  }

  render() {
    const medications = this.props.medications;

    return (
      <div className={classnames('formCenter')}>
        <Card style={{ margin: '20px' }}>
          <CardTitle title="Medicaciones" />
          <CardText>
            <Table onRowSelection={this.handleRowSelection}>
              <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                <TableRow>
                  <TableHeaderColumn>Nombre</TableHeaderColumn>
                  <TableHeaderColumn>Descripción</TableHeaderColumn>
                  <TableHeaderColumn>Cantidad</TableHeaderColumn>
                  <TableHeaderColumn>Período</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {
                  medications && medications.length && medications.map((m, i) =>
                    (<TableRow key={i}>
                      <TableRowColumn>{m.name}</TableRowColumn>
                      <TableRowColumn>{m.description}</TableRowColumn>
                      <TableRowColumn>{m.amount}</TableRowColumn>
                      <TableRowColumn>{periodsMapping[m.period]}</TableRowColumn>
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
