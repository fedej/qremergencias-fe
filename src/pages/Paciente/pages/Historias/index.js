import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import Progress from 'react-progress-2';
import { browserHistory } from 'react-router';
import { RaisedButton, DatePicker, TextField } from 'material-ui';
import MdSearch from 'react-icons/lib/md/search';
import MdClear from 'react-icons/lib/md/clear';
import classnames from 'classnames';
import moment from 'moment';
import 'react-progress-2/main.css';
import '../../../../assets/styles/bootstrap.min.css';

import Home from '../../../Home';
import HistoriaClinica from '../../../Historias/components/HistoriaClinica';

import { fetchHistoriasClinicasDePaciente } from '../../../../store/Historias';
import { correctDate } from '../../../../utils/dateformat';

const historiasContainerStyle = {
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  padding: '20px',
};

function validarFechaDesde(fecha, fechaHasta) {
  if (fechaHasta) {
    return fecha > fechaHasta;
  }

  return fecha > moment().utc().toDate();
}

function validarFechaHasta(fecha) {
  return fecha > moment().utc().toDate();
}

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
    filters: {
      fechaDesde: null,
      fechaHasta: null,
      nombreHistoria: '',
    },
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
  }

  formatDate = (date) => {
    const string = moment(date).format('DD / MM / YYYY');
    return string;
  }

  toLocalDate = (date) => {
    if (!date) {
      return null;
    }
    const string = moment(date).format('YYYY-MM-DD');
    return string;
  }

  handleChangeFilter(tipoFiltro, e, value) {
    switch (tipoFiltro) {
      case 'desde': {
        const { filters } = this.state;
        this.setState({ page: 0, filters: { ...filters, fechaDesde: value } });
        break;
      }
      case 'hasta': {
        const { filters } = this.state;
        if (filters.fechaDesde && filters.fechaDesde > value) {
          this.setState({ page: 0, filters: { ...filters, fechaDesde: null, fechaHasta: value } });
        } else {
          this.setState({ page: 0, filters: { ...filters, fechaHasta: value } });
        }
        break;
      }
      case 'nombreHistoria': {
        const { filters } = this.state;
        this.setState({ page: 0, filters: { ...filters, nombreHistoria: value } });
        break;
      }
    }
  }

  handleDoSearch = () => {
    const { paciente } = this.props;
    const { itemsPerPage, filters } = this.state;
    const token = '1234';

    this.props
      .doFetchHistoriasClinicasDePaciente(paciente, token, 0, itemsPerPage, {
        ...filters,
        fechaDesde: filters.fechaDesde ? this.toLocalDate(filters.fechaDesde) : null,
        fechaHasta: filters.fechaHasta ? this.toLocalDate(filters.fechaHasta) : null,
      });
  }

  handleClearFilters = () => {
    this.setState({
      filters: {
        fechaDesde: null,
        fechaHasta: null,
        nombreHistoria: '',
      },
    }, this.handleDoSearch);
  }

  render() {
    const ElementRight = (
      <div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
          <div>
            <TextField
              hintText="Nombre del Estudio..."
              hintStyle={{ color: 'white' }}
              inputStyle={{ color: 'white' }}
              onChange={this.handleChangeFilter.bind(this, 'nombreHistoria')}
              value={this.state.filters.nombreHistoria}
            />
          </div>
          <div>
            <DatePicker
              style={{ marginLeft: '10px' }}
              textFieldStyle={{ width: null }}
              inputStyle={{ color: 'white' }}
              hintText="desde"
              hintStyle={{ color: 'white' }}
              DateTimeFormat={Intl.DateTimeFormat}
              formatDate={this.formatDate}
              locale="es-ES"
              shouldDisableDate={(fecha) => validarFechaDesde(fecha, this.state.filters.fechaHasta)}
              onChange={this.handleChangeFilter.bind(this, 'desde')}
              value={correctDate(this.state.filters.fechaDesde)}
            />
          </div>
          <div>
            <DatePicker
              style={{ marginLeft: '10px' }}
              textFieldStyle={{ width: null }}
              inputStyle={{ color: 'white' }}
              hintText="hasta"
              hintStyle={{ color: 'white' }}
              DateTimeFormat={Intl.DateTimeFormat}
              formatDate={this.formatDate}
              locale="es-ES"
              shouldDisableDate={validarFechaHasta}
              onChange={this.handleChangeFilter.bind(this, 'hasta')}
              value={correctDate(this.state.filters.fechaHasta)}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <MdSearch
              size={30}
              style={{ color: 'white', cursor: 'pointer' }}
              onClick={this.handleDoSearch}
            />
            <MdClear
              alt="Limpiar Filtros"
              size={30}
              style={{ color: 'white', cursor: 'pointer' }}
              onClick={this.handleClearFilters}
            />
          </div>
        </div>
      </div>
    );

    return (
      <Home navElementRight={ElementRight}>
        <div>
          <Progress.Component
            style={{ background: 'white' }}
            thumbStyle={{ background: 'red' }}
          />
          {
            this.state.historias && this.state.historias.length ? (
              <div>
                <div style={historiasContainerStyle}>
                  {
                    this.state.historias.map((h, i) => <HistoriaClinica historia={h} key={i} />)
                  }
                  <div style={{ textAlign: 'center' }}>
                    <RaisedButton
                      style={{ marginTop: '20px' }}
                      label="Volver"
                      onTouchTap={() => browserHistory.goBack()}
                      primary
                    />
                  </div>
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
            ) : (
              <div style={{ padding: '20px' }}>
                <div className={classnames('formCenter')}>
                  <h2>El paciente no tiene historias médicas cargadas</h2>
                </div>
              </div>
            )
          }
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
  doFetchHistoriasClinicasDePaciente: (paciente, token, page, size, filters) =>
    dispatch(fetchHistoriasClinicasDePaciente(paciente, token, page, size, filters)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HistoriasPaciente);
