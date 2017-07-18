import HistoriasService from '../../utils/api/Historias';

export const HISTORIAS_REQUEST = 'Paciente/HISTORIAS_REQUEST';
export const HISTORIAS_SUCCESS = 'Paciente/HISTORIAS_SUCCESS';
export const HISTORIAS_ERROR = 'Paciente/HISTORIAS_ERROR';


function requestHistorias() {
  return {
    type: HISTORIAS_REQUEST,
  };
}

function historiasSuccess(historias) {
  return {
    type: HISTORIAS_SUCCESS,
    historias,
  };
}

function historiasError(message) {
  return {
    type: HISTORIAS_ERROR,
    message,
  };
}


export const fetchHistoriasClinicas = userId => (dispatch) => {
  dispatch(requestHistorias());

  HistoriasService.byUserId(userId)
    .then(historias => dispatch(historiasSuccess(historias)))
    .catch(err => dispatch(historiasError(err.message)));
};

const INITIAL_STATE = {
  todas: [],
  error: '',
  isFetching: false,
};

export default function Reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case HISTORIAS_REQUEST:
      return { ...INITIAL_STATE, isFetching: true };
    case HISTORIAS_SUCCESS:
      return { ...INITIAL_STATE, isFetching: false, todas: action.historias };
    case HISTORIAS_ERROR:
      return { ...INITIAL_STATE, isFetching: false, error: action.message };
    default:
      return state;
  }
}
