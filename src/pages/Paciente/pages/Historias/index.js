import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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

  componentWillReceiveProps(nextProps) {
    const { historias } = nextProps;

    if (historias) {
      this.setState({ historias });
    }
  }

  render() {
    return (
      <Home>
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
}))(HistoriasPaciente);
