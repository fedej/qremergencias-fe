import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TextField, RaisedButton, DatePicker } from 'material-ui';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import SweetAlert from 'sweetalert-react';

import 'sweetalert/dist/sweetalert.css';

import Home from '../../../Home';
import { uploadHistoriClinica } from '../../../../store/Historias';
import { hasEmptyStringProperties } from '../../../../utils/validations';

const INITIAL_STATE = {
  showError: false,
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
  }

  state = INITIAL_STATE

  componentWillMount() {
    this.setState(INITIAL_STATE);
  }

  componentWillReceiveProps(nextProps) {
    const { error } = nextProps;
    if (error !== '') {
      this.setState({ showError: true });
    }
  }

  handleSubmitHistoriaClinica = () => {
    const { dispatch } = this.props;
    const errores = {};

    errores.nombreError = this.state.nombre === '' ?
      'Ingrese el nombre del estudio.' : '';

    errores.fechaRealizacionError = !this.state.fechaRealizacion ?
      'Ingrese la fecha de realización del estudio.' : '';

    errores.informeError = this.state.informe === '' ?
      'Ingrese el detalle del estudio.' : '';

    errores.fileError = !this.fileInput.files[0] ?
      'Seleccione el documento' : '';

    if (hasEmptyStringProperties(errores)) {
      this.setState(errores, () => {
        const data = new FormData();

        data.append('file', this.fileInput.files[0]);
        data.append('name', 'archivo');
        data.append('description', 'historia clinica');
        data.append('nombre', this.state.nombre);
        data.append('fechaRealizacion', this.state.fechaRealizacion);
        data.append('informe', this.state.informe);
        console.log(data);
        dispatch(uploadHistoriClinica(data));
      });
    } else {
      this.setState(errores);
    }
  }

  render() {
    return (
      <Home>
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
            />
          </CardActions>
          <SweetAlert
            show={this.state.showError}
            title="Error"
            text={this.props.error}
            onConfirm={() => this.setState({ showError: false })}
          />
        </Card>
      </Home>
    );
  }
}

function mapStateToProps(state) {
  return {
    error: state.historias.error,
  };
}

export default connect(mapStateToProps)(CargaHistoriaClinica);
