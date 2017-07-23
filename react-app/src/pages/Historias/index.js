import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Home from '../Home';
import HistoriaClinica from './components/HistoriaClinica';

import { fetchHistoriasClinicas } from '../../store/Historias';

class Historias extends React.Component {
  static defaultProps = {
    historias: [],
  }

  static propTypes = {
    historias: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      nombre: PropTypes.string.isRequired,
      fecha: PropTypes.string.isRequired,
      detalle: PropTypes.string,
      archivo: PropTypes.string,
    })),
    dispatch: PropTypes.func.isRequired,
  }

  state = {
    historias: [],
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchHistoriasClinicas());
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
}))(Historias);
