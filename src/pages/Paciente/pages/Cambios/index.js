import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import Progress from 'react-progress-2';
import 'react-progress-2/main.css';
import { DatePicker, TextField } from 'material-ui';
import MdSearch from 'react-icons/lib/md/search';
import MdClear from 'react-icons/lib/md/clear';
import classnames from 'classnames';
import moment from 'moment';
import './styles.css';

import Home from '../../../Home';

import { fetchCambiosDatosPaciente } from '../../../../store/Paciente';
import { correctDate } from '../../../../utils/dateformat';
import Cambio from './components/Cambio';

function validarFechaDesde(fecha, fechaHasta) {
  if (fechaHasta) {
    return fecha > fechaHasta;
  }

  return fecha > moment().utc().toDate();
}

function validarFechaHasta(fecha) {
  return fecha > moment().utc().toDate();
}

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
    page: 0,
    itemsPerPage: 1,
    filters: {
      fechaDesde: null,
      fechaHasta: null,
      medico: null,
    },
  }

  componentWillMount() {
    this.handleDoSearch();
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
      case 'medico': {
        const { filters } = this.state;
        this.setState({ page: 0, filters: { ...filters, medico: value } });
        break;
      }
    }
  }

  handlePageClick = (data) => {
    const page = data.selected;
    const { itemsPerPage, filters } = this.state;

    this.setState({ page }, () => {
      const { dispatch } = this.props;
      dispatch(fetchCambiosDatosPaciente(page, itemsPerPage, filters));
    });
  }

  handleDoSearch = () => {
    const { page, itemsPerPage, filters } = this.state;
    const { dispatch } = this.props;
    dispatch(fetchCambiosDatosPaciente(page, itemsPerPage, {
      ...filters,
      fechaDesde: filters.fechaDesde ? this.toLocalDate(filters.fechaDesde) : null,
      fechaHasta: filters.fechaHasta ? this.toLocalDate(filters.fechaHasta) : null,
    }));
  }

  handleClearFilters = () => {
    this.setState({
      filters: {
        fechaDesde: null,
        fechaHasta: null,
        medico: null,
      },
    }, this.handleDoSearch);
  }

  render() {
    const { cambios } = this.state;
    const ElementRight = (
      <div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
          <div>
            <TextField
              hintText="Email del Médico"
              hintStyle={{ color: 'white' }}
              inputStyle={{ color: 'white' }}
              onChange={this.handleChangeFilter.bind(this, 'medico')}
              value={this.state.filters.medico || ''}
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
            cambios && cambios.totalPages > 1 ? (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <ReactPaginate
                  previousLabel="previous"
                  nextLabel="next"
                  breakLabel={<a href="">...</a>}
                  breakClassName="break-me"
                  pageCount={cambios.totalPages}
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
          {
            cambios.numberOfElements ? (
              <div style={{ padding: 10 }}>
                {
                  cambios.content && cambios.content.map((c, i) => (
                    <Cambio cambio={c} key={i} />
                  ))
                }
              </div>
            ) : (
              <div>
                <div className={classnames('formCenter')}>
                  <h2>¡Parece ser que aún no tenés cambios o el filtro no trajo resultados!</h2>
                </div>
                <div className={classnames('formCenter')}>
                  <h2>Aquí podrás ver el historial de cambios que se vayan realizando </h2>
                </div>
                <div className={classnames('formCenter')}>
                  <h2>sobre tu perfil a medida que los vaya cargando un médico autorizado.</h2>
                </div>
              </div>
            )
          }

        </div>
      </Home>
    );
  }
}

export default connect(state => ({
  isFetching: state.paciente.isFetching,
  cambios: state.paciente.cambios,
}))(CambiosDatosEmergencia);
