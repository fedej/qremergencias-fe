const SET_REDIRECT_URL = 'Navigation/SET_REDIRECT_URL';


export const setRedirectUrl = currentURL => ({
  type: SET_REDIRECT_URL,
  currentURL,
});


const INITIAL_STATE = {
  redirectURL: '/',
};

export default function Reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case SET_REDIRECT_URL:
      return { redirectURL: action.currentURL };
    default:
      return state;
  }
}
