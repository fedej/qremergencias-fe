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
import moment from 'moment';

function TipoCambio({ changes, tipo }) {
  return (
    <Table selectable={false}>
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
        <TableRow>
          <TableHeaderColumn>Campo</TableHeaderColumn>
          <TableHeaderColumn>Valor Anterior</TableHeaderColumn>
          <TableHeaderColumn>Valor Nuevo</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
        {
          changes.map((c, i) => (
            <TableRow key={i}>
              <TableRowColumn>{c.property}</TableRowColumn>
              <TableRowColumn>{c.oldValue ? c.oldValue : `Removidos: ${c.removed}` }</TableRowColumn>
              <TableRowColumn>{c.newValue ? c.newValue : `Agregados: ${c.added}` }</TableRowColumn>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  );
}

TipoCambio.propTypes = {
  changes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  tipo: PropTypes.string.isRequired,
};

function Cambio({ cambio }) {
  return (
    <div>
      <div>
        <h3>Autor: {cambio.author}</h3>
        <h5>Fecha: {moment(cambio.date).format('DD/MM/YYY')}</h5>
      </div>
      <br />
      <div>
        <h5>Cambios:</h5>
        <br />
        {
          Object.keys(cambio.changes).map((tipo, i) => (
            <TipoCambio
              changes={cambio.changes[tipo]}
              tipo={tipo}
              key={i}
            />
          ))
        }
      </div>
    </div>
  );
}

Cambio.propTypes = {
  cambio: PropTypes.shape({}).isRequired,
};

export default Cambio;