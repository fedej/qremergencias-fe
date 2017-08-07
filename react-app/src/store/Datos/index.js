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

export const fetchData = () => (dispatch) => {
  dispatch(requestData());

  DataService.getData()
    .then(data => dispatch(dataSuccess(data)))
    .catch(err => dispatch(dataError(err.message)));
};

export const updateData = data => (dispatch) => {
  dispatch(requestUpdate());

  DataService.updateData(data)
    .then(() => dispatch(fetchData()))
    .catch(err => dispatch(updateError(err.message)));
};

const INITIAL_STATE = {
  general: {},
  error: '',
  isFetching: false,
};

export default function Reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case DATA_REQUEST:
      return { ...INITIAL_STATE, isFetching: true };
    case DATA_SUCCESS:
      return { ...INITIAL_STATE, isFetching: false, general: action.data.general };
    case DATA_ERROR:
      return { ...INITIAL_STATE, isFetching: false, error: action.message };
    case UPDATE_REQUEST:
      return { ...INITIAL_STATE, isFetching: true };
    case UPDATE_SUCCESS:
      return { ...INITIAL_STATE, isFetching: false };
    case UPDATE_ERROR:
      return { ...INITIAL_STATE, isFetching: false, error: action.message };
    default:
      return state;
  }
}
