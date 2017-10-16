import { connectedRouterRedirect } from 'redux-auth-wrapper/history3/redirect';
import { routerActions } from 'react-router-redux';
import Spinner from 'react-spinkit';

export const UserIsAuthenticated = connectedRouterRedirect({
  redirectPath: '/login',
  authenticatedSelector: state => state.auth.isLoggedIn,
  authenticatingSelector: state => state.auth.isFetching,
  AuthenticatingComponent: Spinner,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAuthenticated',
});

export const VisibleOnlyLoggedOut = connectedRouterRedirect({
  authenticatedSelector: state => !state.auth.isLoggedIn && !state.auth.isFetching,
  redirectPath: '/homePage',
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'VisibleOnlyAdmin',
  allowRedirectBack: false,
});

// export const UserIsAdmin = UserAuthWrapper({
//   authSelector: state => state.auth,
//   redirectAction: routerActions.replace,
//   failureRedirectPath: '/',
//   wrapperDisplayName: 'UserIsAdmin',
//   predicate: auth => auth.isAdmin,
//   allowRedirectBack: false,
// });

export const UserIsPaciente = connectedRouterRedirect({
  authenticatedSelector: state => !state.auth.isMedico,
  redirectAction: routerActions.replace,
  redirectPath: '/homePage',
  wrapperDisplayName: 'UserIsPaciente',
  allowRedirectBack: false,
});

export const UserIsMedico = connectedRouterRedirect({
  authenticatedSelector: state => state.auth.isMedico,
  redirectAction: routerActions.replace,
  redirectPath: '/homePage',
  wrapperDisplayName: 'UserIsMedico',
  allowRedirectBack: false,
});

// export const VisibleOnlyAdmin = UserAuthWrapper({
//   authSelector: state => state.auth,
//   wrapperDisplayName: 'VisibleOnlyAdmin',
//   predicate: auth => auth.isAdmin,
//   FailureComponent: null,
// });
