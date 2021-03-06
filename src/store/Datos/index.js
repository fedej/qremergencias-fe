import DataService from '../../utils/api/Data';

export const DATA_REQUEST = 'Data/DATA_REQUEST';
export const DATA_SUCCESS = 'Data/DATA_SUCCESS';
export const DATA_ERROR = 'Data/DATA_ERROR';

export const UPDATE_REQUEST = 'Data/UPDATE_REQUEST';
export const UPDATE_SUCCESS = 'Data/UPDATE_SUCCESS';
export const UPDATE_ERROR = 'Data/UPDATE_ERROR';


function requestData() {
  return {
    type: DATA_REQUEST,
  };
}

function dataSuccess(data) {
  return {
    type: DATA_SUCCESS,
    data,
  };
}

function dataError(message) {
  return {
    type: DATA_ERROR,
    message,
  };
}

function requestUpdate() {
  return {
    type: UPDATE_REQUEST,
  };
}

function updateSuccess(data) {
  return {
    type: UPDATE_SUCCESS,
    data,
  };
}

function updateError(message) {
  return {
    type: UPDATE_ERROR,
    message,
  };
}

export const fetchData = user => (dispatch) => {
  dispatch(requestData());

  DataService.getData(user)
    .then(data => dispatch(dataSuccess(data)))
    .catch(err => dispatch(dataError(err.message)));
};

export const updateData = (data, user, qrUpdateRequired) => (dispatch) => {
  dispatch(requestUpdate());

  DataService.updateData(data, user, qrUpdateRequired)
    .then(() => dispatch(updateSuccess(data)))
    .catch((err) => {
      if (err.response) {
        return dispatch(updateError(err.message));
      }

      return dispatch(updateError('No se pudo guardar'));
    });
};

const INITIAL_STATE = {
  general: {},
  pathologies: [],
  hospitalizations: [],
  medications: [],
  surgeries: [],
  lastMedicalCheck: '',
  error: '',
  isFetching: false,
};

export default function Reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case DATA_REQUEST:
      return { ...state, isFetching: true, error: '', uploaded: false };
    case DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        general: action.data.general,
        pathologies: action.data.pathologies,
        hospitalizations: action.data.hospitalizations,
        medications: action.data.medications,
        surgeries: action.data.surgeries,
        lastMedicalCheck: action.data.lastMedicalCheck,
        error: '',
      };
    case DATA_ERROR:
      return { ...state, isFetching: false, error: action.message };
    case UPDATE_REQUEST:
      return { ...state, isFetching: true, error: '' };
    case UPDATE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        uploaded: true,
        general: action.data.general,
        pathologies: action.data.pathologies,
        hospitalizations: action.data.hospitalizations,
        medications: action.data.medications,
        surgeries: action.data.surgeries,
        lastMedicalCheck: action.data.lastMedicalCheck,
        error: '',
      };
    case UPDATE_ERROR:
      return { ...state, isFetching: false, error: action.message };
    default:
      return state;
  }
}
