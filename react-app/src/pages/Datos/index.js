import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RaisedButton } from 'material-ui';
import { Tabs, Tab } from 'material-ui/Tabs';
import { Card, CardActions, CardText } from 'material-ui/Card';
import classnames from 'classnames';
import Patologias from './Patologias';
import Generales from './Generales';
import Internaciones from './Internaciones';
import Cirugias from './Cirugias';
import Medicaciones from './Medicaciones';

import { fetchData, updateData } from '../../store/Datos';

import Home from '../Home';

class DatosDeEmergencia extends React.Component {

  static defaultProps = {
    data: {},
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,
    data: PropTypes.shape({
      general: PropTypes.shape({
        bloodType: PropTypes.string,
        organDonor: PropTypes.bool,
        allergic: PropTypes.bool,
        allergies: PropTypes.array,
      }),
    }),
  }

  state = {
    showError: false,
    general: {},
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchData());

    if (this.props.error) {
      this.setState({ showError: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;

    if (data.error) {
      this.setState({ showError: true });
    }

    if (data.general) {
      this.setState({
        general: data.general,
      });
    }
  }

  handleGeneralChange = (newGeneral) => {
    console.log(JSON.stringify(newGeneral));
    this.setState({ general: newGeneral });
  }

  render() {
    const general = this.state.general;
    return (
      <Home>
        <div className={classnames('formCenter')}>
          <Card style={{ display: 'flex', alignContent: 'space-between', flexDirection: 'column' }}>
            <CardText>
              <Tabs>
                <Tab label="Generales">
                  <Generales onGeneralChange={this.handleGeneralChange} general={general} />
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

function mapStateToProps(state) {
  return {
    data: state.data,
  };
}

export default connect(mapStateToProps)(DatosDeEmergencia);
