import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Progress from 'react-progress-2';
import 'react-progress-2/main.css';

import Home from '../../../Home';
import HistoriaClinica from '../../../Historias/components/HistoriaClinica';

import { fetchHistoriasClinicasDePaciente } from '../../../../store/Historias';

class HistoriasPaciente extends React.Component {
  static defaultProps = {
    historias: [],
  }

  static propTypes = {
    historias: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      performed: PropTypes.string.isRequired,
      text: PropTypes.string,
      files: PropTypes.array,
    })),
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
  }

  state = {
    historias: [],
  }

  componentWillMount() {
    const { dispatch, paciente } = this.props;
    // TODO: traer del store
    const token = '1234';
    dispatch(fetchHistoriasClinicasDePaciente(paciente, token));
  }

  componentDidMount() {
    if (this.props.isFetching) {
      Progress.show();
    } else {
      Progress.hide();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { historias } = nextProps;

    if (historias) {
      this.setState({ historias });
    }

    if ((this.props.isFetching && nextProps.isFetching)
    || (nextProps.isFetching && !this.props.isFetching)) {
      Progress.show();
    } else {
      Progress.hide();
    }
  }

  render() {
    return (
      <Home>
        <Progress.Component
          style={{ background: 'white' }}
          thumbStyle={{ background: 'red' }}
        />
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column', padding: '20px' }}>
          {
            this.state.historias.map((h, i) => <HistoriaClinica historia={h} key={i} />)
          }
        </div>
      </Home>
    );
  }
}

export default connect(state => ({
  historias: state.historias.todas,
  paciente: state.paciente.editando,
  isFetching: state.historias.isFetching,
}))(HistoriasPaciente);
