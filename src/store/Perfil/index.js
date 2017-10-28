import ProfileService from '../../utils/api/Profile';
import UserService from '../../utils/api/User';

export const PROFILE_REQUEST = 'Profile/PROFILE_REQUEST';
export const PROFILE_SUCCESS = 'Profile/PROFILE_SUCCESS';
export const PROFILE_ERROR = 'Profile/PROFILE_ERROR';

export const UPDATE_REQUEST = 'Profile/UPDATE_REQUEST';
export const UPDATE_SUCCESS = 'Profile/UPDATE_SUCCESS';
export const UPDATE_ERROR = 'Profile/UPDATE_ERROR';

export const CHANGE_PASSWORD_REQUEST = 'Profile/CHANGE_PASSWORD_REQUEST';
export const CHANGE_PASSWORD_SUCCESS = 'Profile/CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_ERROR = 'Profile/CHANGE_PASSWORD_ERROR';


function requestProfile() {
  return {
    type: PROFILE_REQUEST,
  };
}

function profileSuccess(profile) {
  return {
    type: PROFILE_SUCCESS,
    profile,
  };
}

function profileError(message) {
  return {
    type: PROFILE_ERROR,
    message,
  };
}

function requestUpdate() {
  return {
    type: UPDATE_REQUEST,
  };
}

function updateSuccess(profile) {
  return {
    type: UPDATE_SUCCESS,
    profile,
  };
}

function updateError(message) {
  return {
    type: UPDATE_ERROR,
    message,
  };
}

export const changePassword = options => (dispatch) => {
  dispatch({ type: CHANGE_PASSWORD_REQUEST });

  UserService.changePassword(options)
    .then(() => dispatch({ type: CHANGE_PASSWORD_SUCCESS }))
    .catch(() => dispatch({ type: CHANGE_PASSWORD_ERROR, message: 'Error al actualizar la contraseña' }));
};

export const fetchProfile = () => (dispatch) => {
  dispatch(requestProfile());

  ProfileService.getProfile()
    .then(profile => dispatch(profileSuccess(profile)))
    .catch(err => dispatch(profileError(err.message)));
};

export const updateProfile = (profile, qrUpdateRequired) => (dispatch) => {
  dispatch(requestUpdate());

  ProfileService.updateProfile(profile, qrUpdateRequired)
    .then(() => dispatch(fetchProfile()))
    .catch(err => dispatch(updateError(err.message)));
};

const INITIAL_STATE = {
  perfil: {},
  error: '',
  isFetching: false,
};

export default function Reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case PROFILE_REQUEST:
      return { ...state, isFetching: true, error: '' };
    case PROFILE_SUCCESS:
      return { ...state, isFetching: false, perfil: action.profile };
    case PROFILE_ERROR:
      return { ...state, isFetching: false, error: action.message };
    case UPDATE_REQUEST:
      return { ...state, isFetching: true, error: '' };
    case UPDATE_SUCCESS:
      return { ...state, isFetching: false };
    case UPDATE_ERROR:
      return { ...state, isFetching: false, error: action.message };
    case CHANGE_PASSWORD_REQUEST:
      return { ...state, isFetching: true, error: '' };
    case CHANGE_PASSWORD_SUCCESS:
      return { ...state, isFetching: false, error: '' };
    case CHANGE_PASSWORD_ERROR:
      return { ...state, isFetching: false, error: action.message };
    default:
      return state;
  }
}
