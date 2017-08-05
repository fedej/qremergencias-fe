import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import Patologias from './Patologias';
import Generales from './Generales';
import Internaciones from './Internaciones';
import Cirugias from './Cirugias';
import Medicaciones from './Medicaciones';
import classnames from 'classnames';
import Home from '../Home';

export default class DatosDeEmergencia extends React.Component {
  render(){
    return(
      <Home>
        <div className={classnames('formCenter')}>
          <Tabs>
            <Tab label="Generales">
              <Generales/>
            </Tab>
            <Tab label="Patologias">
              <Patologias/>
            </Tab>
            <Tab label="Internaciones">
              <Internaciones/>
            </Tab>
            <Tab label="Cirugias">
              <Cirugias/>
            </Tab>
            <Tab label="Medicaciones">
              <Medicaciones/>
            </Tab>
          </Tabs>
        </div>
      </Home>
    )
  }
};
