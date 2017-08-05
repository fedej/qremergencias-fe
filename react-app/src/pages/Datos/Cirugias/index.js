import React from 'react';
import Home from '../../Home';
import Slider from 'material-ui/Slider';

export default class Cirugias extends React.Component {
  render() {
    return (
      <Home>
          <div>
            <h2>Cirugias</h2>
            <p>
              Cirugias del paciente
            </p>
            <Slider name="slider0" defaultValue={0.8} />
          </div>
      </Home>
    );
  }
}
