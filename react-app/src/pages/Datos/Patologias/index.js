import React from 'react';
import Home from '../../Home';
import Slider from 'material-ui/Slider';

export default class Patologias extends React.Component {
  render() {
    return (
      <Home>
          <div>
            <h2>Patologias</h2>
            <p>
              Patologias del paciente
            </p>
            <Slider name="slider0" defaultValue={0.4} />
          </div>
      </Home>
    );
  }
}
