import UserService from '../../utils/api/User';

export const LOGIN_REQUEST = 'Auth/LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'Auth/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'Auth/LOGIN_FAILURE';

export const REGISTER_REQUEST = 'Auth/REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'Auth/REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'Auth/REGISTER_FAILURE';

export const LOGOUT_REQUEST = 'Auth/LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'Auth/LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'Auth/LOGOUT_FAILURE';

export const LOGOUT = 'Auth/LOGOUT';
export const COMPLETE_TUTORIAL = 'Auth/COMPLETE_TUTORIAL';
export const COMPLETE_EDITAR_TUTORIAL = 'Auth/COMPLETE_EDITAR_TUTORIAL';

export function completeTutorial() {
  return {
    type: COMPLETE_TUTORIAL,
  };
}

export function completeEditarTutorial() {
  return { type: COMPLETE_EDITAR_TUTORIAL };
}

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
    .catch((err) => {
      if (err.response && err.response.body) {
        return dispatch(loginError(err.response.body.message));
      }

      return dispatch(loginError('Error al iniciar sesión. No se pudo contectar al servidor.'));
    });
};

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
  };
}

function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
  };
}

function logoutError(message) {
  return {
    type: LOGOUT_FAILURE,
    message,
  };
}

export const logOut = () => (dispatch) => {
  dispatch(requestLogout());

  UserService.logout()
    .then(profile => dispatch(logoutSuccess(profile)))
    .catch(err => dispatch(logoutError(err.message)));
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
  if (creds.role === 'ROLE_MEDICO') {
    const credenciales = {
      password: creds.password,
      email: creds.email,
      role: creds.role,
      registrationNumber: creds.registrationNumber,
      file: creds.file,
    };
    UserService.registerDoctor(credenciales)
      .then(() => dispatch(registerSuccess()))
      .catch(err => dispatch(registerError(err.response.body.message)));
  } else {
    UserService.register(creds)
      .then(() => dispatch(registerSuccess()))
      .catch((err) => {
        if (err.response && err.response.body) {
          dispatch(registerError(err.response.body.message));
        } else {
          dispatch(registerError('Error al registrarse. No se pudo contectar al servidor.'));
        }
      });
  }
};

export const completeRegistration = data => (dispatch) => {
  dispatch(requestRegister());

  UserService.completeRegistration(data)
    .then(profile => dispatch(registerComplete(profile)))
    .catch(err => dispatch(registerError(err.response.body.message)));
};

const INITIAL_STATE = {
  isLoggedIn: false,
  isFetching: false,
  isMedico: true,
  hasCompletedEditarTutorial: false,
  hasCompletedTutorial: false,
  profile: {},
  error: '',
};

export default function Reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, isFetching: true, error: '' };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isLoggedIn: true,
        error: '',
        profile: action.profile,
        isMedico: action.profile.roles.includes('ROLE_MEDICO'),
      };
    case LOGIN_FAILURE:
      return { ...state, isFetching: false, error: action.message };
    case REGISTER_REQUEST:
      return { ...state, isFetching: true, error: '' };
    case REGISTER_SUCCESS:
      return { ...state, isFetching: false, error: '' };
    case REGISTER_FAILURE:
      return { ...state, isFetching: false, error: action.message };
    case LOGOUT_REQUEST:
      return { ...state, isFetching: true };
    case LOGOUT_SUCCESS:
      return INITIAL_STATE;
    case LOGOUT_FAILURE:
      return { ...state, isFetching: false, error: action.message };
    case LOGOUT:
      return INITIAL_STATE;
    case COMPLETE_TUTORIAL:
      return { ...state, hasCompletedTutorial: true };
    case COMPLETE_EDITAR_TUTORIAL:
      return { ...state, hasCompletedEditarTutorial: true };
    default:
      return state;
  }
}
