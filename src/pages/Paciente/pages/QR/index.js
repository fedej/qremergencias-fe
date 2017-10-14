import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { FlatButton, RaisedButton } from 'material-ui';
import Progress from 'react-progress-2';
import 'react-progress-2/main.css';
import config from '../../../../constants/app';

import Home from '../../../Home';

import { fetchCodigo, generarCodigo, deprecarCodigo } from '../../../../store/Paciente';

class CodigoQR extends React.Component {
  static propTypes = {
    doGenerarCodigo: PropTypes.func.isRequired,
    doDeprecarCodigo: PropTypes.func.isRequired,
    // doFetchCodigo: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    hasCodigo: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
  }

  state = {
    expanded: false,
    hasCodigo: false,
  }

  componentWillMount() {
    this.props.doGenerarCodigo();
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
      if (nextProps.hasCodigo) {
        this.setState({ hasCodigo: true });
      } else {
        this.setState({ hasCodigo: false });
      }
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
});

const mapDispatchToProps = dispatch => ({
  doFetchCodigo: () => dispatch(fetchCodigo()),
  doGenerarCodigo: () => dispatch(generarCodigo()),
  doDeprecarCodigo: () => dispatch(deprecarCodigo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CodigoQR);
