import React from 'react';
import { browserHistory } from 'react-router';
import { RaisedButton } from 'material-ui';

const color = 'white';

export default function Landing() {
  return (
    <div className="homeBackground" style={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
      <div style={{ textAlign: 'right', marginTop: '1%', marginRight: '1%' }}>
        <RaisedButton
          onClick={() => browserHistory.push('/login')}
          style={{ marginRight: '5px' }}
          labelStyle={{ fontWeight: 'bold' }}
          label="Login"
          primary
        />
      </div>
      <div style={{ flexDirection: 'column', marginTop: '9%' }}>
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
