import React from 'react';
import { browserHistory } from 'react-router';
import { RaisedButton } from 'material-ui';

const color = 'white';

export default function Landing() {
  return (
    <div className="homeBackground">
      <div style={{ flexDirection: 'column', marginTop: '10%' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '5em', color }}>QR Emergencias</h1>
          <h4 style={{ fontSize: '2.5em', color }}>Proyecto UTN.BA</h4>
        </div>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <RaisedButton
            onClick={() => browserHistory.push('/register?medico')}
            style={{ marginRight: '5px' }}
            label="Soy Médico"
            primary
          />
          <RaisedButton
            onClick={() => browserHistory.push('/register?paciente')}
            style={{ marginLeft: '5px' }}
            label="Soy Paciente"
            primary
          />
        </div>
      </div>
    </div>
  );
}
