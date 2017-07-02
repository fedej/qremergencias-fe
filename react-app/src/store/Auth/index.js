import UserService from '../../utils/api/User';

export const LOGIN_REQUEST = 'Auth/LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'Auth/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'Auth/LOGIN_FAILURE';

export const REGISTER_REQUEST = 'Auth/REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'Auth/REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'Auth/REGISTER_FAILURE';

export const LOGOUT = 'Auth/LOGOUT';


function requestLogin() {
  return {
    type: LOGIN_REQUEST,
  };
}

function loginSuccess(profile) {
  return {
    type: LOGIN_SUCCESS,
    profile,
  };
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    message,
  };
}

export const logIn = creds => (dispatch) => {
  dispatch(requestLogin());

  UserService.login(creds)
    .then(profile => dispatch(loginSuccess(profile)))
    .catch(err => dispatch(loginError(err.message)));
};

function requestRegister() {
  return {
    type: REGISTER_REQUEST,
  };
}

function registerSuccess() {
  return {
    type: REGISTER_SUCCESS,
  };
}

function registerComplete(profile) {
  return {
    type: REGISTER_SUCCESS,
    profile,
  };
}

function registerError(message) {
  return {
    type: REGISTER_FAILURE,
    message,
  };
}

export const signUp = creds => (dispatch) => {
  dispatch(requestRegister());

  UserService.register(creds)
    .then(() => dispatch(registerSuccess()))
    .catch(err => dispatch(registerError(err.message)));
};

export const logOut = () => ({
  type: LOGOUT,
});

export const completeRegistration = data => (dispatch) => {
  UserService.completeRegistration(data)
    .then(profile => dispatch(registerComplete(profile)))
    .catch(err => dispatch(registerError(err.message)));
};

const INITIAL_STATE = {
  isLoggedIn: false,
  isFetching: false,
  profile: {},
  error: '',
};

export default function Reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { isFetching: true };
    case LOGIN_SUCCESS:
      return { isFetching: false, isLoggedIn: true, error: '', profile: action.profile };
    case LOGIN_FAILURE:
      return { isFetching: false, error: action.message };
    case REGISTER_REQUEST:
      return { isFetching: true };
    case REGISTER_SUCCESS:
      return { isFetching: false, error: '' };
    case REGISTER_FAILURE:
      return { isFetching: false, error: action.message };
    case LOGOUT:
      return { isOpen: !state.isOpen };
    default:
      return state;
  }
}
