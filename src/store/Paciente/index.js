import PacienteService from '../../utils/api/Paciente';

export const PACIENTE_REQUEST = 'Profile/PACIENTE_REQUEST';
export const PACIENTE_ERROR = 'Profile/PACIENTE_ERROR';

export const PACIENTE_CAMBIOS_DATOS_REQUEST = 'Profile/PACIENTE_CAMBIOS_DATOS_REQUEST';
export const PACIENTE_CAMBIOS_DATOS_ERROR = 'Profile/PACIENTE_CAMBIOS_DATOS_ERROR';
export const PACIENTE_CAMBIOS_DATOS_SUCCESS = 'Profile/PACIENTE_CAMBIOS_DATOS_SUCCESS';

export const VINCULAR_PACIENTE_SUCCESS = 'Profile/VINCULAR_PACIENTE_SUCCESS';

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
    type: VINCULAR_PACIENTE_SUCCESS,
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

export const fetchCambiosDatosPaciente = id => (dispatch) => {
  dispatch({ type: PACIENTE_REQUEST });

  PacienteService.getCambiosDatosEmergencia(id)
    .then(cambios => dispatch(cambiosSuccess(cambios)))
    .catch(err => dispatch({ type: PACIENTE_CAMBIOS_DATOS_ERROR, error: err.message }));
};


const INITIAL_STATE = {
  editando: {},
  isFetching: false,
  error: '',
  cambios: {},
};

export default function Reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case PACIENTE_REQUEST:
      return { ...state, isFetching: true };
    case VINCULAR_PACIENTE_SUCCESS:
      return { ...state, isFetching: false, editando: action.perfil };
    case PACIENTE_ERROR:
      return { ...state, isFetching: false, error: action.message };
    case PACIENTE_CAMBIOS_DATOS_REQUEST:
      return { ...state, isFetching: true };
    case PACIENTE_CAMBIOS_DATOS_SUCCESS:
      return { ...state, isFetching: false, cambios: action.cambios };
    case PACIENTE_CAMBIOS_DATOS_ERROR:
      return { ...state, isFetching: false, error: action.error };
    default:
      return state;
  }
}
