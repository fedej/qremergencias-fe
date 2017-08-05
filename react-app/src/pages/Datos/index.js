import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import Patologias from './Patologias';
import Generales from './Generales';
import Internaciones from './Internaciones';
import Cirugias from './Cirugias';
import Medicaciones from './Medicaciones';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

function handleActive(tab) {
  alert(`A tab with this route property ${tab.props['data-route']} was activated.`);
}

const TabsExampleSimple = () => (
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
);

export default TabsExampleSimple;
