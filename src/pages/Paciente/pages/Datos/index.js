import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui/Tabs';
import Progress from 'react-progress-2';
import 'react-progress-2/main.css';

import Home from '../../../Home';
import Cirugias from './components/Cirugias';
import Generales from './components/Generales';
import Internaciones from './components/Internaciones';
import Medicaciones from './components/Medicaciones';
import Patologias from './components/Patologias';

import { fetchData } from '../../../../store/Datos';

class DatosEmergenciaPaciente extends React.Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
  }

  state = {
    expanded: false,
    hasCodigo: false,
  }

  componentWillMount() {
    const { dispatch, paciente } = this.props;
    dispatch(fetchData(paciente));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isFetching && !this.props.isFetching) {
      Progress.show();
    } else if (this.props.isFetching && !nextProps.isFetching) {
      Progress.hide();
    }
  }

  render() {
    const { data } = this.props;
    const { general, pathologies, hospitalizations, surgeries, medications } = data;

    return (
      <Home>
        <div>
          <Progress.Component
            style={{ background: 'white' }}
            thumbStyle={{ background: 'red' }}
          />
          <Tabs>
            <Tab label="Generales">
              <Generales general={general} />
            </Tab>
            <Tab label="Patologias">
              <Patologias pathologies={pathologies || []} />
            </Tab>
            <Tab label="Internaciones">
              <Internaciones
                hospitalizations={hospitalizations || []}
              />
            </Tab>
            <Tab label="Cirugias">
              <Cirugias
                surgeries={surgeries || []}
              />
            </Tab>
            <Tab label="Medicaciones">
              <Medicaciones
                medications={medications || []}
              />
            </Tab>
          </Tabs>
        </div>
      </Home>
    );
  }
}

const mapStateToProps = state => ({
  data: state.data,
  paciente: state.auth.profile.email,
  isFetching: state.data.isFetching,
});

export default connect(mapStateToProps)(DatosEmergenciaPaciente);
