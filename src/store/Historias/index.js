import HistoriasService from '../../utils/api/Historias';

export const HISTORIAS_REQUEST = 'HistoriaClinica/HISTORIAS_REQUEST';
export const HISTORIAS_SUCCESS = 'HistoriaClinica/HISTORIAS_SUCCESS';
export const HISTORIAS_ERROR = 'HistoriaClinica/HISTORIAS_ERROR';

export const UPLOAD_REQUEST = 'HistoriaClinica/UPLOAD_REQUEST';
export const UPLOAD_SUCCESS = 'HistoriaClinica/UPLOAD_SUCCESS';
export const UPLOAD_ERROR = 'HistoriaClinica/UPLOAD_ERROR';

export const HISTORIA_DELETE = 'HistoriaClinica/HISTORIA_DELETE';
export const HISTORIA_DELETE_SUCCESS = 'HistoriaClinica/HISTORIA_DELETE_SUCCESS';


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

function requestUpload() {
  return {
    type: UPLOAD_REQUEST,
  };
}

function uploadSuccess(historias) {
  return {
    type: UPLOAD_SUCCESS,
    historias,
  };
}

function uploadError(message) {
  return {
    type: UPLOAD_ERROR,
    message,
  };
}

function deleteHistoriaSuccess() {
  return {
    type: HISTORIA_DELETE_SUCCESS,
  };
}

function deleteHistoria() {
  return {
    type: HISTORIA_DELETE,
  };
}

export const fetchHistoriasClinicasDePaciente = (id, token) => (dispatch) => {
  dispatch(requestHistorias());

  HistoriasService.listByUser(id, token)
    .then((records) => {
      const historias = records.content.map((h) => {
        const historia = h;
        historia.performed = h.performed.toISOString();
        return historia;
      });

      dispatch(historiasSuccess(historias));
    })
    .catch(err => dispatch(historiasError(err.message)));
};

export const fetchHistoriasClinicas = () => (dispatch) => {
  dispatch(requestHistorias());

  HistoriasService.list()
    .then((records) => {
      const historias = records.content.map((h) => {
        const historia = h;
        historia.performed = h.performed.toISOString();
        return historia;
      });

      dispatch(historiasSuccess(historias));
    })
    .catch(err => dispatch(historiasError(err.message)));
};

export const deleteHistoriaClinica = id => (dispatch) => {
  dispatch(deleteHistoria());

  HistoriasService.delete(id)
    .then(() => dispatch(deleteHistoriaSuccess()))
    .catch(err => dispatch(historiasError(err.message)));
};

export const uploadHistoriClinica = form => (dispatch) => {
  dispatch(requestUpload());

  HistoriasService.upload(form)
    .then(() => dispatch(uploadSuccess()))
    .catch(err => dispatch(uploadError(err.message)));
};

const INITIAL_STATE = {
  todas: [],
  error: '',
  uploaded: false,
  isFetching: false,
};

export default function Reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case HISTORIAS_REQUEST:
    case HISTORIA_DELETE:
    case UPLOAD_REQUEST:
      return { ...INITIAL_STATE, isFetching: true };
    case HISTORIAS_SUCCESS:
      return { ...INITIAL_STATE, isFetching: false, todas: action.historias };
    case HISTORIAS_ERROR:
    case UPLOAD_ERROR:
      return { ...INITIAL_STATE, isFetching: false, error: action.message };
    case UPLOAD_SUCCESS:
      return { ...INITIAL_STATE, isFetching: false, uploaded: true };
    case HISTORIA_DELETE_SUCCESS:
      return { ...INITIAL_STATE, isFetching: false };
    default:
      return state;
  }
}
