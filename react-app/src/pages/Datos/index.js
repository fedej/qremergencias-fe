import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RaisedButton } from 'material-ui';
import { Tabs, Tab } from 'material-ui/Tabs';
import { Card, CardActions, CardText } from 'material-ui/Card';
import classnames from 'classnames';
import { browserHistory } from 'react-router';
import SweetAlert from 'sweetalert-react';
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
      medications: PropTypes.array,
      surgeries: PropTypes.array,
    }),
  }

  state = {
    showError: false,
    showSuccess: false,
    general: {},
    error: '',
    pathologies: [],
    hospitalizations: [],
    medications: [],
  }

  componentWillMount() {
    const { dispatch, paciente } = this.props;
    dispatch(fetchData(paciente));

    if (this.props.error) {
      this.setState({ showError: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;

    if (data.error) {
      this.setState({ showError: true });
    } else if (data.uploaded) {
      this.setState({ showSuccess: true });
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
    if (data.medications) {
      this.setState({
        medications: data.medications,
      });
    }
    if (data.surgeries) {
      this.setState({
        surgeries: data.surgeries,
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

  handleMedicationChange = (medications) => {
    this.setState({ medications });
  }

  handleSurgeriesChange = (surgeries) => {
    this.setState({ surgeries });
  }

  handleSaveData = () => {
    const { general, pathologies, hospitalizations, medications, surgeries } = this.state;

    const data = {
      general,
      pathologies,
      hospitalizations,
      medications,
      surgeries,
    };

    const { dispatch, paciente } = this.props;
    dispatch(updateData(data, paciente));
  }

  handleSuccessCallback = () => {
    this.setState({ showSuccess: false });
    const { dispatch, paciente } = this.props;
    dispatch(fetchData(paciente));
  }

  render() {
    const general = this.state.general;
    const pathologies = this.state.pathologies;
    const hospitalizations = this.state.hospitalizations;
    const medications = this.state.medications;
    const surgeries = this.state.surgeries;
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
                  <Cirugias onSurgeriesChange={this.handleSurgeriesChange} surgeries={surgeries} />
                </Tab>
                <Tab label="Medicaciones">
                  <Medicaciones onMedicationChange={this.handleMedicationChange} medications={medications} />
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
                onTouchTap={browserHistory.goBack}
                primary
              />
            </CardActions>
          </Card>
          <SweetAlert
            show={this.state.showSuccess}
            title="Exito"
            text="Los datos se han cargado con exito"
            onConfirm={this.handleSuccessCallback}
          />
        </div>
      </Home>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.data,
    paciente: state.paciente.editando,
  };
}

export default connect(mapStateToProps)(DatosDeEmergencia);
