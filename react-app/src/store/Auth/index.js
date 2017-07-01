import UserService from '../../utils/api/User';

export const LOGIN_REQUEST = 'Auth/LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'Auth/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'Auth/LOGIN_FAILURE';

export const LOGOUT = 'Auth/LOGOUT';


function requestLogin() {
  return {
    type: LOGIN_REQUEST,
  };
}

function receiveLogin(profile) {
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
    .then(profile => dispatch(receiveLogin(profile)))
    .catch(err => dispatch(loginError(err.message)));
};

export const logOut = () => ({
  type: LOGOUT,
});


const INITIAL_STATE = {
  isLoggedIn: false,
  isFetching: false,
  profile: {},
  error: '',
};

export default function Reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { isFetching: false };
    case LOGIN_SUCCESS:
      return { isFetching: false, isLoggedIn: true, profile: action.profile };
    case LOGIN_FAILURE:
      return { isFetching: false, error: action.message };
    case LOGOUT:
      return { isOpen: !state.isOpen };
    default:
      return state;
  }
}
