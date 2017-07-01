import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route, IndexRoute } from 'react-router';

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

import EnsureSession from './components/EnsureSession';
import EnsureLoggedIn from './components/EnsureLoggedIn';
import EnsureLoggedOut from './components/EnsureLoggedOut';

export default function Routes({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={EnsureSession}>
        <IndexRoute component={Landing} />
        <Route component={EnsureLoggedOut}>
          <Route path="register" component={Register} />
          <Route path="login" component={Login} />
          <Route path="forgotPassword" component={ForgotPassword} />
        </Route>
        <Route component={EnsureLoggedIn}>
          <Route path="/home" component={Home}>
            <Route path="datos" component={Datos} />
            <Route path="perfil" component={Perfil} />
            <Route path="historia" component={Historia} />
            <Route path="codigo" component={Codigo} />
          </Route>
        </Route>
      </Route>
      <Route path="*" component={NotFound} />
    </Router>
  );
}

Routes.propTypes = {
  history: PropTypes.shape({}).isRequired,
};
