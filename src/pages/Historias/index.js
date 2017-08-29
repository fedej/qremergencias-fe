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
            this.state.historias.map((h, i) => <HistoriaClinica dispatch={this.props.dispatch} historia={h} key={i} />)
          }
        </div>
      </Home>
    );
  }
}

export default connect(state => ({
  historias: state.historias.todas,
}))(Historias);
