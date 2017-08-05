import React from 'react';
import Home from '../../Home';
import Slider from 'material-ui/Slider';

export default class Medicaciones extends React.Component {
  render() {
    return (
      <Home>
          <div>
            <h2>Medicaciones</h2>
            <p>
              Medicaciones que toma el paciente
            </p>
            <Slider name="slider0" defaultValue={0.2} />
          </div>
      </Home>
    );
  }
}
