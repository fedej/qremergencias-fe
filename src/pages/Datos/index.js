import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RaisedButton } from 'material-ui';
import { Tabs, Tab } from 'material-ui/Tabs';
import { Card, CardActions, CardText } from 'material-ui/Card';
import classnames from 'classnames';
import { browserHistory } from 'react-router';
import SweetAlert from 'sweetalert-react';
import Progress from 'react-progress-2';
import 'react-progress-2/main.css';


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
      lastMedicalCheck: PropTypes.string,
      error: PropTypes.string,
    }),
    isFetching: PropTypes.bool.isRequired,
  }

  state = {
    showError: false,
    showSuccess: false,
    general: {},
    error: '',
    pathologies: [],
    hospitalizations: [],
    medications: [],
    lastMedicalCheck: '',
  }

  componentWillMount() {
    const { dispatch, paciente } = this.props;
    dispatch(fetchData(paciente));
  }

  componentDidMount() {
    Progress.hide();
  }

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;

    if (data.error) {
      this.setState({ showError: true });
      Progress.hide();
    } else if (data.uploaded) {
      this.setState({
        ...data,
        showSuccess: true,
      });
    } else {
      this.setState(data);
    }

    if (nextProps.isFetching && !this.props.isFetching) {
      Progress.show();
    } else {
      Progress.hide();
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

  handlelastMedicalCheckChange = (lastMedicalCheck) => {
    this.setState({ lastMedicalCheck });
  }

  handleSaveData = () => {
    const {
      general,
      pathologies,
      hospitalizations,
      medications,
      surgeries,
      lastMedicalCheck,
    } = this.state;

    const data = {
      general,
      pathologies,
      hospitalizations,
      medications,
      surgeries,
      lastMedicalCheck,
    };

    const { dispatch, paciente } = this.props;
    dispatch(updateData(data, paciente));
  }

  handleSuccessCallback = () => {
    this.setState({ showSuccess: false });
  }

  render() {
    const {
      general,
      pathologies,
      hospitalizations,
      medications,
      surgeries,
      lastMedicalCheck,
    } = this.state;

    return (
      <Home>
        <div>
          <Progress.Component
            style={{ background: 'white' }}
            thumbStyle={{ background: 'red' }}
          />
          <div className={classnames('formCenter')}>
            <Card style={{ display: 'flex', alignContent: 'space-between', flexDirection: 'column' }}>
              <CardText>
                <Tabs>
                  <Tab label="Generales">
                    <Generales
                      onGeneralChange={this.handleGeneralChange}
                      general={general}
                      lastMedicalCheck={lastMedicalCheck}
                    />
                  </Tab>
                  <Tab label="Patologias">
                    <Patologias
                      onPathologiesChange={this.handlePathologiesChange}
                      pathologies={pathologies || []}
                    />
                  </Tab>
                  <Tab label="Internaciones">
                    <Internaciones
                      onHospitalizationsChange={this.handleHospitalizationsChange}
                      hospitalizations={hospitalizations || []}
                    />
                  </Tab>
                  <Tab label="Cirugias">
                    <Cirugias
                      onSurgeriesChange={this.handleSurgeriesChange}
                      surgeries={surgeries || []}
                    />
                  </Tab>
                  <Tab label="Medicaciones">
                    <Medicaciones
                      onMedicationChange={this.handleMedicationChange}
                      medications={medications || []}
                    />
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
        </div>
      </Home>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.data,
    paciente: state.paciente.editando,
    isFetching: state.data.isFetching,
  };
}

export default connect(mapStateToProps)(DatosDeEmergencia);
