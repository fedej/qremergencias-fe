import React from 'react';
import Home from '../../Home';
import Slider from 'material-ui/Slider';

export default class Generales extends React.Component {
  render() {
    return (
      <Home>
          <div>
            <h2>Generales</h2>
            <p>
              Datos generales de emergencia
            </p>
            <Slider name="slider0" defaultValue={0.2} />
          </div>
      </Home>
    );
  }
}
