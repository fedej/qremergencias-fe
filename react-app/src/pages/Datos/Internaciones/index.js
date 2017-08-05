import React from 'react';
import Home from '../../Home';
import Slider from 'material-ui/Slider';

export default class Internaciones extends React.Component {
  render() {
    return (
      <Home>
          <div>
            <h2>Internaciones</h2>
            <p>
              Internaciones de emergencia
            </p>
            <Slider name="slider0" defaultValue={0.2} />
          </div>
      </Home>
    );
  }
}
