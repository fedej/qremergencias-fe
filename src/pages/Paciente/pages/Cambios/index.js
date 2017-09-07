import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Progress from 'react-progress-2';
import 'react-progress-2/main.css';

import Home from '../../../Home';

import { fetchCambiosDatosPaciente } from '../../../../store/Paciente';
import Cambio from './components/Cambio';

class CambiosDatosEmergencia extends React.Component {
  static defaultProps = {
    cambios: {},
  }

  static propTypes = {
    cambios: PropTypes.shape({}),
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
  }

  state = {
    cambios: {},
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchCambiosDatosPaciente());
  }

  componentDidMount() {
    if (this.props.isFetching) {
      Progress.show();
    } else {
      Progress.hide();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { cambios } = nextProps;

    if (cambios) {
      this.setState({ cambios });
    }

    if ((this.props.isFetching && nextProps.isFetching)
    || (nextProps.isFetching && !this.props.isFetching)) {
      Progress.show();
    } else {
      Progress.hide();
    }
  }

  render() {
    const { cambios } = this.state;
    return (
      <Home>
        <div>
          <Progress.Component
            style={{ background: 'white' }}
            thumbStyle={{ background: 'red' }}
          />
          <div style={{ padding: 10 }}>
            {
              cambios.content && cambios.content.map((c, i) => (
                <Cambio cambio={c} key={i} />
              ))
            }
          </div>
        </div>
      </Home>
    );
  }
}

export default connect(state => ({
  isFetching: state.paciente.isFetching,
  cambios: state.paciente.cambios,
}))(CambiosDatosEmergencia);