import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
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
    totalPages: PropTypes.number.isRequired,
    doFetchHistoriasClinicasDePaciente: PropTypes.func.isRequired,
  }

  state = {
    historias: [],
    page: 0,
    itemsPerPage: 2,
  }

  componentWillMount() {
    const { dispatch, paciente } = this.props;
    const { page, itemsPerPage } = this.state;
    // TODO: traer del store
    const token = '1234';
    this.props.doFetchHistoriasClinicasDePaciente(paciente, token, page, itemsPerPage);
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

  handlePageClick = (data) => {
    const { paciente } = this.props;
    const { itemsPerPage } = this.state;
    const page = data.selected;
    // TODO: traer del store
    const token = '1234';
    this.setState({ page }, () =>
      this.props
        .doFetchHistoriasClinicasDePaciente(paciente, token, page, itemsPerPage));
  };

  render() {
    return (
      <Home>
        <div>
          <Progress.Component
            style={{ background: 'white' }}
            thumbStyle={{ background: 'red' }}
          />
          <div style={{ display: 'flex', flex: 1, flexDirection: 'column', padding: '20px' }}>
            {
              this.state.historias.map((h, i) => <HistoriaClinica historia={h} key={i} />)
            }
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ReactPaginate
              previousLabel="previous"
              nextLabel="next"
              breakLabel={<a href="">...</a>}
              breakClassName="break-me"
              pageCount={this.props.totalPages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageClick}
              containerClassName="pagination"
              subContainerClassName="pages pagination"
              activeClassName="active"
            />
          </div>
        </div>
      </Home>
    );
  }
}

const mapStateToProps = state => ({
  historias: state.historias.todas,
  paciente: state.paciente.editando,
  isFetching: state.historias.isFetching,
  totalPages: state.historias.totalPages,
});

const mapDispatchToProps = dispatch => ({
  doFetchHistoriasClinicasDePaciente: (paciente, token, page, size) =>
    dispatch(fetchHistoriasClinicasDePaciente(paciente, token, page, size)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HistoriasPaciente);
