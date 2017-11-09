import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { FlatButton, RaisedButton } from 'material-ui';
import Progress from 'react-progress-2';
import SweetAlert from 'sweetalert-react';
import Joyride from 'react-joyride';
import 'react-joyride/lib/react-joyride-compiled.css';
import 'react-progress-2/main.css';
import 'sweetalert/dist/sweetalert.css';

import config from '../../../../constants/app';
import Home from '../../../Home';
import { completeTutorial } from '../../../../store/Auth';
import { fetchCodigo, generarCodigo, deprecarCodigo } from '../../../../store/Paciente';
import ProfileService from '../../../../utils/api/Profile';

class CodigoQR extends React.Component {
  static propTypes = {
    doCompleteTutorial: PropTypes.func.isRequired,
    doGenerarCodigo: PropTypes.func.isRequired,
    doDeprecarCodigo: PropTypes.func.isRequired,
    doFetchCodigo: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    hasCodigo: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
    isValido: PropTypes.bool.isRequired,
    hasCompletedTutorial: PropTypes.bool.isRequired,
  }

  state = {
    expanded: false,
    hasCodigo: false,
    isValido: false,
    showError: false,
    version: 0,
    steps: [
      {
        title: 'Presione con fuerza aquí para generar el código',
        textAlign: 'center',
        selector: '#generar',
        position: 'right',
      },
    ],
    stepsConCodigo: [
      {
        title: 'Presione aquí para ver el código',
        textAlign: 'center',
        selector: '#ver',
        position: 'right',
      },
      {
        title: 'Presione aquí para ver generar el código',
        textAlign: 'center',
        selector: '#generar',
        position: 'right',
      },
      {
        title: 'Presione aquí para deprecar el código',
        textAlign: 'center',
        selector: '#deprecar',
        position: 'right',
      },
    ],
  }

  componentWillMount() {
    ProfileService.getProfile()
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
          this.setState({ hasCodigo: true, error: '', version: this.state.version + 1 });
        } else {
          this.setState({ hasCodigo: false, error: '' });
        }
      } else {
        this.setState({
          showError: true,
          error: 'Es necesario que mínimamente cargues contactos de emergencia para poder generar el QR.',
        });
      }
    }
  }

  checkIsValido(data) {
    if (data.contacts.length) {
      this.setState({ isValido: true });
      this.props.doFetchCodigo(this.props.username);
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

  handleGenerarQR = () => {
    if (this.state.isValido) {
      this.props.doGenerarCodigo();
    } else {
      this.setState({
        showError: true,
        error: 'Es necesario que mínimamente cargues contactos de emergencia para poder generar el QR.',
      });
    }
  }

  handleCallback = (data) => {
    if (data.type === 'finished') {
      this.props.doCompleteTutorial();
    }
  }

  handleDeprecarQR = () => this.props.doDeprecarCodigo();

  render() {
    return (
      <Home>
        <Joyride
          ref={(ref) => { this.joyride = ref; }}
          steps={this.state.steps}
          run={!this.props.hasCompletedTutorial && !this.props.hasCodigo}
          callback={this.handleCallback}
        />
        <Joyride
          ref={(ref) => { this.joyride = ref; }}
          steps={this.state.stepsConCodigo}
          run={!this.props.hasCompletedTutorial && this.props.hasCodigo}
          callback={this.handleCallback}
        />
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
                    ref={(image) => { this.image = image; }}
                    alt="Código QR"
                    src={`${config.BASE_URL}/qremergencias/api/emergencyData/qr?user=${this.props.username}#${this.state.version}`}
                  />
                </CardText>
              )
            }
            <CardActions>
              {
                this.state.hasCodigo && (
                  <none>
                    <FlatButton
                      id="ver"
                      label={this.state.expanded ? 'Ocultar' : 'Ver'}
                      onClick={this.handleToggle}
                    />
                    <FlatButton
                      id="deprecar"
                      label="Deprecar Código"
                      onClick={this.handleDeprecarQR}
                    />
                    </none>
                )
              }
              <RaisedButton
                label="Generar Código"
                primary
                id="generar"
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
  hasCompletedTutorial: state.auth.hasCompletedTutorial,
  codigo: state.paciente.codigo,
  isValido: state.paciente.isValido,
  error: state.paciente.error,
});

const mapDispatchToProps = dispatch => ({
  doFetchCodigo: username => dispatch(fetchCodigo(username)),
  doGenerarCodigo: () => dispatch(generarCodigo()),
  doDeprecarCodigo: () => dispatch(deprecarCodigo()),
  doCompleteTutorial: () => dispatch(completeTutorial()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CodigoQR);
