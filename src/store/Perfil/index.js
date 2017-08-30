import ProfileService from '../../utils/api/Profile';

export const PROFILE_REQUEST = 'Profile/PROFILE_REQUEST';
export const PROFILE_SUCCESS = 'Profile/PROFILE_SUCCESS';
export const PROFILE_ERROR = 'Profile/PROFILE_ERROR';

export const UPDATE_REQUEST = 'Profile/UPDATE_REQUEST';
export const UPDATE_SUCCESS = 'Profile/UPDATE_SUCCESS';
export const UPDATE_ERROR = 'Profile/UPDATE_ERROR';


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

export const fetchProfile = () => (dispatch) => {
  dispatch(requestProfile());

  ProfileService.getProfile()
    .then(profile => dispatch(profileSuccess(profile)))
    .catch(err => dispatch(profileError(err.message)));
};

export const updateProfile = profile => (dispatch) => {
  dispatch(requestUpdate());

  ProfileService.updateProfile(profile)
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
      return { ...state, isFetching: true };
    case PROFILE_SUCCESS:
      return { ...state, isFetching: false, perfil: action.profile };
    case PROFILE_ERROR:
      return { ...state, isFetching: false, error: action.message };
    case UPDATE_REQUEST:
      return { ...state, isFetching: true };
    case UPDATE_SUCCESS:
      return { ...state, isFetching: false };
    case UPDATE_ERROR:
      return { ...state, isFetching: false, error: action.message };
    default:
      return state;
  }
}
