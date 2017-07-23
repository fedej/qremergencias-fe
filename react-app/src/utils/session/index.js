import { UserAuthWrapper } from 'redux-auth-wrapper';
import { routerActions } from 'react-router-redux';

export const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.auth,
  redirectAction: routerActions.replace,
  predicate: auth => auth.isLoggedIn,
  wrapperDisplayName: 'UserIsAuthenticated',
  allowRedirectBack: false,
});

export const UserIsAdmin = UserAuthWrapper({
  authSelector: state => state.auth,
  redirectAction: routerActions.replace,
  failureRedirectPath: '/',
  wrapperDisplayName: 'UserIsAdmin',
  predicate: auth => auth.isAdmin,
  allowRedirectBack: false,
});

export const UserIsPaciente = UserAuthWrapper({
  authSelector: state => state.auth,
  redirectAction: routerActions.replace,
  failureRedirectPath: '/',
  wrapperDisplayName: 'UserIsPaciente',
  predicate: auth => !auth.isMedico,
  allowRedirectBack: false,
});

export const UserIsMedico = UserAuthWrapper({
  authSelector: state => state.auth,
  redirectAction: routerActions.replace,
  failureRedirectPath: '/',
  wrapperDisplayName: 'UserIsMedico',
  predicate: auth => auth.isMedico,
  allowRedirectBack: false,
});

export const VisibleOnlyLoggedOut = UserAuthWrapper({
  authSelector: state => state.auth,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'VisibleOnlyAdmin',
  predicate: auth => !auth.isLoggedIn,
  failureRedirectPath: '/home',
  allowRedirectBack: false,
});

export const VisibleOnlyAdmin = UserAuthWrapper({
  authSelector: state => state.auth,
  wrapperDisplayName: 'VisibleOnlyAdmin',
  predicate: auth => auth.isAdmin,
  FailureComponent: null,
});
