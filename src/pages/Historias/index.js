import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import Progress from 'react-progress-2';
import moment from 'moment';
import { browserHistory } from 'react-router';
import { RaisedButton, DatePicker, TextField } from 'material-ui';
import MdSearch from 'react-icons/lib/md/search';
import MdClear from 'react-icons/lib/md/clear';
import classnames from 'classnames';
import 'react-progress-2/main.css';
import '../../assets/styles/bootstrap.min.css';
import './styles.css';

import Home from '../Home';
import HistoriaClinica from './components/HistoriaClinica';

import { fetchHistoriasClinicas } from '../../store/Historias';
import { correctDate } from '../../utils/dateformat';


function validarFechaDesde(fecha, fechaHasta) {
  if (fechaHasta) {
    return fecha > fechaHasta;
  }

  return fecha > moment().utc().toDate();
}

function validarFechaHasta(fecha) {
  return fecha > moment().utc().toDate();
}

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
    isFetching: PropTypes.bool.isRequired,
    doFetchHistoriasClinicas: PropTypes.func.isRequired,
    totalPages: PropTypes.number.isRequired,
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
    this.props.doFetchHistoriasClinicas(this.state.page, this.state.itemsPerPage);
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

  handlePageClick = (data) => {
    const page = data.selected;
    this.setState({ page }, () =>
      this.props.doFetchHistoriasClinicas(this.state.page, this.state.itemsPerPage, { ...this.state.filters }));
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
    // TODO: validar formato de fechas
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
    const { itemsPerPage, filters } = this.state;

    this.props.doFetchHistoriasClinicas(0, itemsPerPage, {
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
          this.state.historias.length ? (
            <div>
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
                <div style={{ textAlign: 'center' }}>
                  <RaisedButton
                    style={{ marginTop: '20px' }}
                    label="Volver"
                    onTouchTap={() => browserHistory.goBack()}
                    primary
                  />
                </div>
              </div>
              {
                this.props.totalPages > 1 ? (
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
              ) : ''
              }
            </div>
          ) : (
            <div style={{ padding: '20px' }}>
              <div className={classnames('formCenter')}>
                <h2>¡Parece ser que aún no tenés nada cargado en tu historia clínica!</h2>
              </div>
              <div className={classnames('formCenter')}>
                <h2>Aquí podrás ver todos los estudios</h2>
              </div>
              <div className={classnames('formCenter')}>
                <h2>que te vayan cargando los médicos en tus visitas</h2>
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
  totalPages: state.historias.totalPages,
  historias: state.historias.todas,
  isFetching: state.historias.isFetching,
});

const mapDispatchToProps = dispatch => ({
  doFetchHistoriasClinicas: (page, itemsPerPage, filters) =>
    dispatch(fetchHistoriasClinicas(page, itemsPerPage, filters)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Historias);
