import React from 'react';
import { TextField, RaisedButton, DatePicker } from 'material-ui';
import { Tabs, Tab } from 'material-ui/Tabs';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import classnames from 'classnames';
import Patologias from './Patologias';
import Generales from './Generales';
import Internaciones from './Internaciones';
import Cirugias from './Cirugias';
import Medicaciones from './Medicaciones';

import Home from '../Home';

export default class DatosDeEmergencia extends React.Component {
  render() {
    return (
      <Home>
        <div className={classnames('formCenter')}>
          <Card style={{ display: 'flex', alignContent: 'space-between', flexDirection: 'column' }}>
            <CardText>
              <Tabs>
                <Tab label="Generales">
                  <Generales />
                </Tab>
                <Tab label="Patologias">
                  <Patologias />
                </Tab>
                <Tab label="Internaciones">
                  <Internaciones />
                </Tab>
                <Tab label="Cirugias">
                  <Cirugias />
                </Tab>
                <Tab label="Medicaciones">
                  <Medicaciones />
                </Tab>
              </Tabs>
            </CardText>
            <CardActions style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
              <RaisedButton
                label="Guardar"
                onTouchTap={this.handleOpenContactDialog}
                primary
              />
              <RaisedButton
                label="Cancelar"
                onTouchTap={this.handleOpenContactDialog}
                primary
              />
            </CardActions>
          </Card>
        </div>
      </Home>
    );
  }
}
