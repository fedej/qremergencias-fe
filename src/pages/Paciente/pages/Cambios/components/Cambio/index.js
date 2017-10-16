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
  organDonor: 'Donante de Organos',
  true: 'Si',
  false: 'No',
  antecedentes_oncologicos: 'Antecedentes oncologicos',
  insuficiencia_suprarrenal: 'Insuficiencia suprarrenal',
};

function FilaCambio({ tipo, length, change, indice }) {
  let modifier = '';
  let section = tipo;
  if (tipo.includes('.new')) {
    modifier = ' [Nuevo!]';
  } else if (tipo.includes('.deleted')) {
    modifier = ' [Borrado!]';
  }
  let indiceCambio = '';
  if (section.includes('[')) {
    const lastIndexOfAngularCorchetStart = section.lastIndexOf('[');
    const lastIndexOfAngularCorchetEnd = section.lastIndexOf(']');
    indiceCambio = '[' + section.substring(lastIndexOfAngularCorchetStart + 1,
      lastIndexOfAngularCorchetEnd) + ']';
    section = section.substring(0, lastIndexOfAngularCorchetStart);
  } else if (section.includes('.new')) {
    section = section.substring(0, section.lastIndexOf('.new'));
  }

  section = translate[section] + indiceCambio + modifier;

  let oldValue = change.oldValue ? change.oldValue : (change.removed && change.removed.constructor.name === 'Array' && change.removed.length > 0) ? `Removidos: ${change.removed}` : '-';
  if (translate[oldValue]) {
    oldValue = translate[oldValue];
  }

  let newValue = change.newValue ? change.newValue : (change.added && change.added.constructor.name === 'Array' && change.added.length > 0) ? `Agregados: ${change.added}` : '-';
  if (translate[newValue]) {
    newValue = translate[newValue];
  }

  return (
    <TableRow key={indice}>
      {indice === 0 ? <TableRowColumn rowSpan={length} >{section}</TableRowColumn> : ''}
      <TableRowColumn>{translate[change.property]}</TableRowColumn>
      <TableRowColumn>{oldValue}</TableRowColumn>
      <TableRowColumn>{newValue}</TableRowColumn>
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
        <h5>Fecha: {moment(cambio.date).format('DD/MM/YYYY HH:mm:ss')}</h5>
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
