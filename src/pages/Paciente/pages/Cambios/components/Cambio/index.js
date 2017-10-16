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

const translate = {
  pathologies: 'Patologias',
  hospitalizations: 'Internaciones',
  medications: 'Medicaciones',
  general: 'Generales',
  surgeries: 'Cirugias',
  type: 'Tipo',
  institution: 'Institucion',
  date: 'Fecha',
  reason: 'Motivo',
  bloodType: 'Factor sanguineo',
  allergies: 'Alergias',
  name: 'Nombre',
  description: 'Descripcion',
  amount: 'Cantidad',
  period: 'Periodo',
};

function FilaCambio({ tipo, length, change, indice }) {
  let modifier = '';
  let section = tipo;
  if (tipo.includes('.new')) {
    modifier = ' [Nuevo!]';
  }

  if (section.includes('[')) {
    section = section.substring(0, section.lastIndexOf('['));
  } else if (section.includes('.new')) {
    section = section.substring(0, section.lastIndexOf('.new'));
  }

  section = translate[section] + modifier;

  return (
    <TableRow key={indice}>
      {indice === 0 ? <TableRowColumn rowSpan={length} >{section}</TableRowColumn> : ''}
      <TableRowColumn>{translate[change.property]}</TableRowColumn>
      <TableRowColumn>{change.oldValue ? change.oldValue : (change.removed && change.removed.type !== undefined) ? `Removidos: ${change.removed}` : '-'}</TableRowColumn>
      <TableRowColumn>{change.newValue ? change.newValue : (change.added && change.added.type !== undefined) ? `Agregados: ${change.added}` : '-'}</TableRowColumn>
    </TableRow>
  );
}

FilaCambio.propTypes = {
  change: PropTypes.shape({}).isRequired,
  tipo: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired,
  indice: PropTypes.number.isRequired,
};

function TipoCambio({ cambio }) {
  return (
    <Table selectable={false}>
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
        <TableRow>
          <TableHeaderColumn>Sección</TableHeaderColumn>
          <TableHeaderColumn>Campo</TableHeaderColumn>
          <TableHeaderColumn>Valor Anterior</TableHeaderColumn>
          <TableHeaderColumn>Valor Nuevo</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
        {
          Object.keys(cambio.changes).map((tipo, index) => (
            cambio.changes[tipo].map((c, laKey) => (
              <FilaCambio
                change={c}
                tipo={tipo}
                length={cambio.changes[tipo].length}
                indice={laKey}
              />
            ))
          ))
        };
    </TableBody>
    </Table>
  );
}

TipoCambio.propTypes = {
  cambio: PropTypes.shape({}).isRequired,
};

function Cambio({ cambio }) {
  return (
    <div>
      <div>
        <h3>Autor: {cambio.author}</h3>
        <h5>Fecha: {moment(cambio.date).format('DD/MM/YYYY')}</h5>
      </div>
      <br />
      <div>
        <h5>Cambios:</h5>
        <br />
        <TipoCambio cambio={cambio} />
      </div>
    </div>
  );
}

Cambio.propTypes = {
  cambio: PropTypes.shape({}).isRequired,
};

export default Cambio;
