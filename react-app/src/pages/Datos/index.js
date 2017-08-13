import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RaisedButton } from 'material-ui';
import { Tabs, Tab } from 'material-ui/Tabs';
import { Card, CardActions, CardText } from 'material-ui/Card';
import classnames from 'classnames';
import moment from 'moment';
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
      pathologies: PropTypes.array,
      hospitalizations: PropTypes.array,
    }),
  }

  state = {
    showError: false,
    general: {},
    error: '',
    pathologies: [],
    hospitalizations: [],
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
    if (data.pathologies) {
      this.setState({
        pathologies: data.pathologies,
      });
    }
    if (data.hospitalizations) {
      this.setState({
        hospitalizations: data.hospitalizations,
      });
    }
  }

  handleGeneralChange = (newGeneral) => {
    this.setState({ general: newGeneral });
  }

  handlePathologiesChange = (pathologies) => {
    this.setState({ pathologies });
  }

  handleHospitalizationsChange = (hospitalizations) => {
    this.setState({ hospitalizations });
  }

  handleSaveData = () => {
    // TODO: arreglar esta goma
    const pathologies = this.state.pathologies.map((p) => {
      p.date = moment(p.date).format('YYYY-MM-DD');
      return p;
    });
    this.setState({ pathologies });
    // TODO: esta tambien
    const hospitalizations = this.state.hospitalizations.map((p) => {
      p.date = moment(p.date).format('YYYY-MM-DD');
      return p;
    });
    this.setState({ hospitalizations });

    const { dispatch } = this.props;
    dispatch(updateData(this.state));
  }

  render() {
    const general = this.state.general;
    const pathologies = this.state.pathologies;
    const hospitalizations = this.state.hospitalizations;
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
                  <Patologias onPathologiesChange={this.handlePathologiesChange} pathologies={pathologies} />
                </Tab>
                <Tab label="Internaciones">
                  <Internaciones onHospitalizationsChange={this.handleHospitalizationsChange} hospitalizations={hospitalizations} />
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
                onTouchTap={this.handleSaveData}
                primary
              />
              <RaisedButton
                label="Cancelar"
                onTouchTap={this.handleCancel}
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
