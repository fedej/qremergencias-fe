import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import Progress from 'react-progress-2';
import { browserHistory } from 'react-router';
import { RaisedButton } from 'material-ui';
import classnames from 'classnames';
import 'react-progress-2/main.css';
import '../../assets/styles/bootstrap.min.css';
import './styles.css';

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
    doFetchHistoriasClinicas: PropTypes.func.isRequired,
    totalPages: PropTypes.number.isRequired,
  }

  state = {
    historias: [],
    page: 0,
    itemsPerPage: 2,
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
      this.props.doFetchHistoriasClinicas(this.state.page, this.state.itemsPerPage));
  };

  render() {
    return (
      <Home>
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
  doFetchHistoriasClinicas: (page, itemsPerPage) =>
    dispatch(fetchHistoriasClinicas(page, itemsPerPage)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Historias);
