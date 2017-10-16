import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { FlatButton, RaisedButton } from 'material-ui';
import Progress from 'react-progress-2';
import 'react-progress-2/main.css';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';

import config from '../../../../constants/app';
import Home from '../../../Home';
import { fetchCodigo, generarCodigo, deprecarCodigo } from '../../../../store/Paciente';
import DataService from '../../../../utils/api/Data';

class CodigoQR extends React.Component {
  static propTypes = {
    doGenerarCodigo: PropTypes.func.isRequired,
    doDeprecarCodigo: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    hasCodigo: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
    isValido: PropTypes.bool.isRequired,
  }

  state = {
    expanded: false,
    hasCodigo: false,
    isValido: false,
    showError: false,
  }

  componentWillMount() {
    DataService.getData(this.props.username)
      .then(data => this.checkIsValido(data))
      .catch(err => this.setState({ error: err }));
  }

  componentDidMount() {
    if (this.props.isFetching) {
      Progress.show();
    } else {
      Progress.hide();
    }
  }

  componentWillReceiveProps(nextProps) {
    if ((this.props.isFetching && nextProps.isFetching)
    || (nextProps.isFetching && !this.props.isFetching)) {
      Progress.show();
    } else {
      Progress.hide();
      if (this.state.isValido) {
        if (nextProps.hasCodigo) {
          this.setState({ hasCodigo: true, error: '' });
        } else {
          this.setState({ hasCodigo: false, error: '' });
        }
      } else {
        this.setState({
          showError: true,
          error: 'Es necesario que visites un médico y que cargue los datos de emergencia para poder generar el QR.',
        });
      }
    }
  }

  checkIsValido(data) {
    if (data.lastMedicalCheck !== null) {
      this.setState({ isValido: true });
    } else {
      this.setState({ isValido: false });
    }
  }

  handleExpandChange = (expanded) => {
    this.setState({ expanded });
  }

  handleToggle = () => {
    this.setState({ expanded: !this.state.expanded });
  }

  handleGenerarQR = () => this.props.doGenerarCodigo();
  handleDeprecarQR = () => this.props.doDeprecarCodigo();

  render() {
    return (
      <Home>
        <div style={{ padding: '10px' }}>
          <Progress.Component
            style={{ background: 'white' }}
            thumbStyle={{ background: 'red' }}
          />
          <Card
            {
              ...this.state.hasCodigo ? {
                expanded: this.state.expanded,
                onExpandChange: this.handleExpandChange,
              } : null
            }
          >
            <CardHeader
              title="Código QR"
              {
                ...this.state.hasCodigo ? {
                  actAsExpander: true,
                  showExpandableButton: true,
                } : null
              }
            />
            {
              this.state.hasCodigo && (
                <CardText
                  style={{ textAlign: 'center' }}
                  expandable
                >
                  <img
                    style={{ width: '100%', maxWidth: '360px' }}
                    alt="Código QR"
                    src={`${config.BASE_URL}/qremergencias/api/emergencyData/qr?user=${this.props.username}`}
                  />
                </CardText>
              )
            }
            <CardActions>
              {
                this.state.hasCodigo && (
                  <none>
                    <FlatButton
                      label={this.state.expanded ? 'Ocultar' : 'Ver'}
                      onClick={this.handleToggle}
                    />
                    <FlatButton
                      label="Deprecar Código"
                      onClick={this.handleDeprecarQR}
                    />
                    </none>
                )
              }
              <RaisedButton
                label="Generar Código"
                primary
                onClick={this.handleGenerarQR}
              />
            </CardActions>
          </Card>
          <SweetAlert
            show={this.state.showError}
            title="Error al generar el QR"
            text={this.state.error}
            onConfirm={() => this.setState({ showError: false })}
          />
        </div>
      </Home>
    );
  }
}

const mapStateToProps = state => ({
  hasCodigo: state.paciente.hasCodigo,
  isFetching: state.paciente.isFetching,
  username: state.auth.profile.email,
  codigo: state.paciente.codigo,
  isValido: state.paciente.isValido,
  error: state.paciente.error,
});

const mapDispatchToProps = dispatch => ({
  doFetchCodigo: () => dispatch(fetchCodigo()),
  doGenerarCodigo: () => dispatch(generarCodigo()),
  doDeprecarCodigo: () => dispatch(deprecarCodigo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CodigoQR);
