import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route } from 'react-router';

import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';

import Landing from './pages/Landing';
import Home from './pages/Home';
import Perfil from './pages/Perfil';
import Datos from './pages/Datos';
import Historia from './pages/Historia';
import Codigo from './pages/Codigo';
import NotFound from './pages/NotFound';

import { UserIsAuthenticated, VisibleOnlyLoggedOut } from './utils/session';


const Authenticated = UserIsAuthenticated(props => props.children);
const AllowOnlyUnauthenticated = VisibleOnlyLoggedOut(props => props.children);

export default function Routes({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={Landing} />
      <Route component={AllowOnlyUnauthenticated}>
        <Route path="register" component={Register} />
        <Route path="login" component={Login} />
        <Route path="forgotPassword" component={ForgotPassword} />
      </Route>
      <Route component={Authenticated}>
        <Route path="home" component={Home} />
        <Route path="datos" component={Datos} />
        <Route path="perfil" component={Perfil} />
        <Route path="historia" component={Historia} />
        <Route path="codigo" component={Codigo} />
      </Route>
      <Route path="*" component={NotFound} />
    </Router>
  );
}

Routes.propTypes = {
  history: PropTypes.shape({}).isRequired,
};
