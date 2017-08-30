import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Progress from 'react-progress-2';
import 'react-progress-2/main.css';

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
    isFetching: PropTypes.bool.isRequired,
  }

  state = {
    historias: [],
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchHistoriasClinicas());
  }

  componentDidMount() {
    if (this.props.isFetching) {
      Progress.show();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { historias } = nextProps;

    if ((this.props.isFetching && nextProps.isFetching)
      || (nextProps.isFetching && !this.props.isFetching)) {
      Progress.show();
    } else {
      Progress.hide();
    }

    if (historias) {
      this.setState({ historias });
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
            this.state.historias.map((h, i) => (
              <HistoriaClinica
                dispatch={this.props.dispatch}
                historia={h}
                key={i}
              />
            ))
          }
        </div>
      </Home>
    );
  }
}

export default connect(state => ({
  historias: state.historias.todas,
  isFetching: state.historias.isFetching,
}))(Historias);
