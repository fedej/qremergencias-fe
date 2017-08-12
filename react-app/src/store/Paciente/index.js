import PacienteService from '../../utils/api/Paciente';

export const PACIENTE_REQUEST = 'Profile/PACIENTE_REQUEST';
export const PACIENTE_ERROR = 'Profile/PACIENTE_ERROR';

export const VINCULAR_PACIENTE_SUCCESS = 'Profile/VINCULAR_PACIENTE_SUCCESS';


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


const INITIAL_STATE = {
  editando: {},
  isFetching: false,
  error: '',
};

export default function Reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case PACIENTE_REQUEST:
      return { ...state, isFetching: true };
    case VINCULAR_PACIENTE_SUCCESS:
      return { ...state, isFetching: false, editando: action.perfil };
    case PACIENTE_ERROR:
      return { ...state, isFetching: false, error: action.message };
    default:
      return state;
  }
}
