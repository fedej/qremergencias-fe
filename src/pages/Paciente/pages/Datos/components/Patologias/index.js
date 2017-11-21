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

const pathologyType = [
  { key: 'asma', value: 'asma' },
  { key: 'hipertension', value: 'hipertension' },
  { key: 'antecedentes_oncologicos', value: 'antecedentes oncologicos' },
  { key: 'insuficiencia_suprarrenal', value: 'insuficiencia suprarrenal' },
  { key: 'otro', value: 'otro' },
];

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
      pathologies && pathologies.length ? (
        <div className={classnames('formCenter')}>
          <Card style={{ margin: '20px' }}>
            <CardTitle title="Patologías" />
            <CardText>
              <Table>
                <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                  <TableRow>
                    <TableHeaderColumn>Fecha</TableHeaderColumn>
                    <TableHeaderColumn>Tipo</TableHeaderColumn>
                    <TableHeaderColumn>Descripción</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  {
                    pathologies && pathologies.length && pathologies.map((p, i) =>
                      (<TableRow key={i}>
                        <TableRowColumn>{moment.utc(p.date).format('DD / MM / YYYY')}</TableRowColumn>
                        <TableRowColumn>
                          {pathologyType.find(pathology => pathology.key === p.type).value}
                        </TableRowColumn>
                        <TableRowColumn>{p.description}</TableRowColumn>
                      </TableRow>),
                    )
                  }
                </TableBody>
              </Table>
            </CardText>
          </Card>
        </div>) : (
          <div>
            <div className={classnames('formCenter')}>
              <h2>¡Parece ser que aún no tenés patologías cargadas!</h2>
            </div>
            <div className={classnames('formCenter')}>
              <h2>Aquí podrás ver el listado de patologías </h2>
            </div>
            <div className={classnames('formCenter')}>
              <h2>a medida que las vaya cargando un médico autorizado.</h2>
            </div>
          </div>

        )
    );
  }
}
