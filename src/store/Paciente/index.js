import PacienteService from '../../utils/api/Paciente';

export const PACIENTE_REQUEST = 'PACIENTE/PACIENTE_REQUEST';
export const PACIENTE_ERROR = 'PACIENTE/PACIENTE_ERROR';

export const PACIENTE_CAMBIOS_DATOS_REQUEST = 'PACIENTE/PACIENTE_CAMBIOS_DATOS_REQUEST';
export const PACIENTE_CAMBIOS_DATOS_ERROR = 'PACIENTE/PACIENTE_CAMBIOS_DATOS_ERROR';
export const PACIENTE_CAMBIOS_DATOS_SUCCESS = 'PACIENTE/PACIENTE_CAMBIOS_DATOS_SUCCESS';

export const VINCULAR_PACIENTE_SUCCESS = 'PACIENTE/VINCULAR_PACIENTE_SUCCESS';
export const VINCULAR_PACIENTE_ERROR = 'PACIENTE/VINCULAR_PACIENTE_ERROR';

export const GENERAR_QR_REQUEST = 'PACIENTE/GENERAR_QR_REQUEST';
export const GENERAR_QR_SUCCESS = 'PACIENTE/GENERAR_QR_SUCCESS';
export const GENERAR_QR_ERROR = 'PACIENTE/GENERAR_QR_ERROR';

export const OBTENER_QR_REQUEST = 'PACIENTE/OBTENER_QR_REQUEST';
export const OBTENER_QR_SUCCESS = 'PACIENTE/OBTENER_QR_SUCCESS';
export const OBTENER_QR_ERROR = 'PACIENTE/OBTENER_QR_ERROR';

export const DEPRECAR_QR_REQUEST = 'PACIENTE/DEPRECAR_QR_REQUEST';
export const DEPRECAR_QR_SUCCESS = 'PACIENTE/DEPRECAR_QR_SUCCESS';
export const DEPRECAR_QR_ERROR = 'PACIENTE/DEPRECAR_QR_ERROR';

function cambiosSuccess(cambios) {
  return {
    type: PACIENTE_CAMBIOS_DATOS_SUCCESS,
    cambios,
  };
}

function vincularSuccess(perfil) {
  return {
    type: VINCULAR_PACIENTE_SUCCESS,
    perfil,
  };
}

function pacienteError(error) {
  return {
    type: VINCULAR_PACIENTE_ERROR,
    error,
  };
}

function requestPaciente() {
  return { type: PACIENTE_REQUEST };
}

export const vincularPaciente = token => (dispatch) => {
  dispatch(requestPaciente());

  PacienteService.vincular(token)
    .then(profile => dispatch(vincularSuccess(profile)))
    .catch(err => dispatch(pacienteError(err.message)));
};

export const fetchCambiosDatosPaciente = () => (dispatch) => {
  dispatch({ type: PACIENTE_REQUEST });

  PacienteService.getCambiosDatosEmergencia()
    .then(cambios => dispatch(cambiosSuccess(cambios)))
    .catch(err => dispatch({ type: PACIENTE_CAMBIOS_DATOS_ERROR, error: err.message }));
};

export const fetchCodigo = () => (dispatch) => {
  dispatch({ type: OBTENER_QR_REQUEST });

  PacienteService.getCodigoQR()
    .then(codigo => dispatch({ type: OBTENER_QR_SUCCESS, codigo }))
    .catch((err) => {
      dispatch({ type: OBTENER_QR_ERROR, error: err.message });
    });
};

export const generarCodigo = () => (dispatch) => {
  dispatch({ type: GENERAR_QR_REQUEST });

  PacienteService.generarCodigoQR()
    .then(() => dispatch({ type: GENERAR_QR_SUCCESS }))
    .catch(err => dispatch({ type: GENERAR_QR_ERROR, error: err.message }));
};

export const deprecarCodigo = () => (dispatch) => {
  dispatch({ type: DEPRECAR_QR_REQUEST });

  PacienteService.deprecarCodigoQR()
    .then(() => dispatch({ type: DEPRECAR_QR_SUCCESS }))
    .catch(err => dispatch({ type: DEPRECAR_QR_ERROR, error: err.message }));
};

const INITIAL_STATE = {
  editando: {},
  isFetching: false,
  error: '',
  cambios: {},
  hasCodigo: false,
  codigo: {},
};

export default function Reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case PACIENTE_REQUEST:
      return { ...state, isFetching: true };
    case VINCULAR_PACIENTE_SUCCESS:
      return { ...state, isFetching: false, editando: action.perfil, error: '' };
    case VINCULAR_PACIENTE_ERROR:
      return { ...state, isFetching: false, error: action.error };
    case PACIENTE_ERROR:
      return { ...state, isFetching: false, error: action.message };
    case PACIENTE_CAMBIOS_DATOS_REQUEST:
      return { ...state, isFetching: true };
    case PACIENTE_CAMBIOS_DATOS_SUCCESS:
      return { ...state, isFetching: false, cambios: action.cambios };
    case PACIENTE_CAMBIOS_DATOS_ERROR:
      return { ...state, isFetching: false, error: action.error };
    case GENERAR_QR_REQUEST:
      return { ...state, isFetching: true };
    case GENERAR_QR_SUCCESS:
      return { ...state, isFetching: false, hasCodigo: true };
    case GENERAR_QR_ERROR:
      return { ...state, isFetching: false, error: action.message };
    case OBTENER_QR_REQUEST:
      return { ...state, isFetching: true };
    case OBTENER_QR_SUCCESS:
      return { ...state, isFetching: false, hasCodigo: true, codigo: action.codigo };
    case OBTENER_QR_ERROR:
      return { ...state, isFetching: false, error: action.message };
    case DEPRECAR_QR_REQUEST:
      return { ...state, isFetching: true };
    case DEPRECAR_QR_SUCCESS:
      return { ...state, isFetching: false, hasCodigo: false };
    case DEPRECAR_QR_ERROR:
      return { ...state, isFetching: false, error: action.message };
    default:
      return state;
  }
}
