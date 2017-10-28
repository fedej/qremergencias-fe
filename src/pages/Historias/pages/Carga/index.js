import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { TextField, RaisedButton, DatePicker } from 'material-ui';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import SweetAlert from 'sweetalert-react';
import moment from 'moment';
import Progress from 'react-progress-2';
import 'react-progress-2/main.css';
import 'sweetalert/dist/sweetalert.css';

import Home from '../../../Home';
import { uploadHistoriClinica } from '../../../../store/Historias';
import {
  hasEmptyStringProperties,
  isEmptyString,
  stringHasNumbers,
} from '../../../../utils/validations';

const INITIAL_STATE = {
  showError: false,
  showSuccess: false,
  nombre: '',
  nombreError: '',
  fechaRealizacion: null,
  fechaRealizacionError: '',
  informe: '',
  informeError: '',
  fileError: '',
};

function disableFutureDays(date) {
  return date > new Date();
}

class CargaHistoriaClinica extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,
    uploaded: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
  }

  state = INITIAL_STATE

  componentWillMount() {
    this.setState(INITIAL_STATE);
  }

  componentWillReceiveProps(nextProps) {
    const { error, uploaded } = nextProps;
    if (error !== '') {
      this.setState({ showError: true });
    } else if (uploaded) {
      this.setState({ showSuccess: true });
    }

    if (nextProps.isFetching && !this.props.isFetching) {
      Progress.show();
    } else {
      Progress.hide();
    }
  }

  formatDate = (date) => {
    const string = moment(date).format('DD / MM / YYYY');
    return string;
  }

  handleSubmitHistoriaClinica = () => {
    const { dispatch, paciente } = this.props;
    const errores = {};

    errores.nombreError = isEmptyString(this.state.nombre) ?
      'Ingrese el nombre del estudio.' : '';

    errores.fechaRealizacionError = !this.state.fechaRealizacion ?
      'Ingrese la fecha de realización del estudio.' : '';

    errores.informeError = isEmptyString(this.state.informe) ?
      'Ingrese el detalle del estudio.' : '';

    errores.fileError = !this.fileInput.files[0] ?
      'Seleccione el documento' : '';

    if (hasEmptyStringProperties(errores)) {
      this.setState(errores, () => {
        const data = {
          file: this.fileInput.files[0],
          name: this.state.nombre,
          performed: moment(this.state.fechaRealizacion).format('YYYY-MM-DD'),
          text: this.state.informe,
          user: paciente,
        };
        dispatch(uploadHistoriClinica(data));
      });
    } else {
      this.setState(errores);
    }
  }

  handleSuccessCallback = () => {
    this.setState({ showSuccess: false }, () => {
      setTimeout(() => {
        browserHistory.push('/editar');
      }, 1000);
    });
  }

  render() {
    return (
      <Home>
        <div>
          <Progress.Component
            style={{ background: 'white' }}
            thumbStyle={{ background: 'red' }}
          />
          <Card style={{ margin: '2%' }}>
            <CardTitle title="Cargar Historia" />
            <CardText>
              <TextField
                onChange={(e, nombre) => this.setState({ nombre })}
                value={this.state.nombre}
                errorText={this.state.nombreError}
                hintText="Nombre del estudio"
                floatingLabelText="Estudio"
                fullWidth
              />
              <DatePicker
                textFieldStyle={{ width: '100%' }}
                hintText="Fecha del informe"
                shouldDisableDate={disableFutureDays}
                onChange={(e, fechaRealizacion) => this.setState({ fechaRealizacion })}
                locale="es-ES"
                formatDate={this.formatDate}
                DateTimeFormat={Intl.DateTimeFormat}
              />
              <p style={{ color: 'rgb(244, 67, 54)' }}>
                {this.state.fechaRealizacionError}
              </p>
              <TextField
                hintText="Texto del informe"
                errorText={this.state.informeError}
                onChange={(e, informe) => this.setState({ informe })}
                multiLine
                fullWidth
                rowsMax={20}
              />
              <input
                ref={(input) => { this.fileInput = input; }}
                style={{ marginTop: '2vh' }}
                type="file"
                name="archivo"
              />
              <p style={{ color: 'rgb(244, 67, 54)' }}>
                {this.state.fileError}
              </p>
            </CardText>
            <CardActions style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
              <RaisedButton
                label="Cargar"
                onTouchTap={this.handleSubmitHistoriaClinica}
                primary
                fullWidth
              />
              <RaisedButton
                label="Volver"
                onTouchTap={() => browserHistory.goBack()}
                fullWidth
              />
            </CardActions>
            <SweetAlert
              show={this.state.showError}
              title="Error"
              text={this.props.error}
              onConfirm={() => this.setState({ showError: false })}
            />
            <SweetAlert
              show={this.state.showSuccess}
              title="Exito"
              text="Carga realizada con exito"
              onConfirm={this.handleSuccessCallback}
            />
          </Card>
        </div>
      </Home>
    );
  }
}

function mapStateToProps(state) {
  return {
    error: state.historias.error,
    uploaded: state.historias.uploaded,
    isFetching: state.historias.isFetching,
    paciente: state.paciente.editando,
  };
}

export default connect(mapStateToProps)(CargaHistoriaClinica);
