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

function historiasSuccess(historias, totalPages) {
  return {
    type: HISTORIAS_SUCCESS,
    historias,
    totalPages,
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

export const fetchHistoriasClinicasDePaciente = (id, token, page, size) => (dispatch) => {
  dispatch(requestHistorias());

  HistoriasService.listByUser(id, token, page, size)
    .then((records) => {
      const { totalPages, content } = records;
      const historias = content.map((h) => {
        const historia = h;
        historia.performed = h.performed.toISOString();
        return historia;
      });

      dispatch(historiasSuccess(historias, totalPages));
    })
    .catch(err => dispatch(historiasError(err.message)));
};

export const fetchHistoriasClinicas = (page, itemsPerPage) => (dispatch) => {
  dispatch(requestHistorias());

  HistoriasService.list(page, itemsPerPage)
    .then((records) => {
      const { totalPages, content } = records;
      const historias = content.map((h) => {
        const historia = h;
        historia.performed = h.performed.toISOString();
        return historia;
      });

      dispatch(historiasSuccess(historias, totalPages));
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
  totalPages: 0,
};

export default function Reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case HISTORIAS_REQUEST:
      return { ...state, isFetching: true, error: '' };
    case HISTORIA_DELETE:
    case UPLOAD_REQUEST:
      return { ...state, isFetching: true, uploaded: false, error: '' };
    case HISTORIAS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        todas: action.historias,
        totalPages: action.totalPages,
        error: '',
      };
    case HISTORIAS_ERROR:
    case UPLOAD_ERROR:
      return { ...state, isFetching: false, error: action.message };
    case UPLOAD_SUCCESS:
      return { ...state, isFetching: false, uploaded: true, error: '' };
    case HISTORIA_DELETE_SUCCESS:
      return { ...state, isFetching: false };
    default:
      return state;
  }
}
