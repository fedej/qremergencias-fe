import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { FlatButton, RaisedButton } from 'material-ui';
import Progress from 'react-progress-2';
import 'react-progress-2/main.css';

import Home from '../../../Home';

import { fetchCodigo, generarCodigo } from '../../../../store/Paciente';

class CodigoQR extends React.Component {
  static propTypes = {
    doGenerarCodigo: PropTypes.func.isRequired,
    doFetchCodigo: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    hasCodigo: PropTypes.bool.isRequired,
  }

  state = {
    expanded: false,
    hasCodigo: false,
  }

  componentWillMount() {
    // TODO: el GET deberia decirnos si tiene o no QR generado
    // if (this.state.hasCodigo) {
      this.props.doFetchCodigo();
    // } else {
    //   this.props.doGenerarCodigo();
    // }
  }

  componentDidMount() {
    if (this.props.isFetching) {
      Progress.show();
    } else {
      Progress.hide();
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps');
    console.log(this.props);
    console.log(nextProps);
    // TODO: obtener nextProps.codigo
    if ((this.props.isFetching && nextProps.isFetching)
    || (nextProps.isFetching && !this.props.isFetching)) {
      Progress.show();
    } else {
      Progress.hide();
      if (!this.props.hasCodigo && nextProps.hasCodigo) {
        this.setState({ hasCodigo: true });
        this.props.doFetchCodigo();
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
                  {/* TODO: render QR */}
                  <img
                    alt="Código QR"
                    src="https://www.unitag.io/images/generator/templates/classic.png"
                  />
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                    Donec vulputate interdum sollicitudin.
                    Nunc lacinia auctor quam sed pellentesque.
                    Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                  </p>
                </CardText>
              )
            }
            <CardActions>
              {
                this.state.hasCodigo ?
                  <FlatButton
                    label={this.state.expanded ? 'Ocultar' : 'Ver'}
                    onClick={this.handleToggle}
                  />
                  :
                  <RaisedButton
                    label="Generar Código"
                    primary
                    onClick={this.handleGenerarQR}
                  />
              }
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
  codigo: state.paciente.codigo,
});

const mapDispatchToProps = dispatch => ({
  doFetchCodigo: () => dispatch(fetchCodigo()),
  doGenerarCodigo: () => dispatch(generarCodigo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CodigoQR);
