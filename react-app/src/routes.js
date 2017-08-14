import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route } from 'react-router';

import Login from './pages/Login';
import Register from './pages/Register';
import RegisterSuccess from './pages/Session/pages/RegisterSuccess';
import CompleteRegister from './pages/Session/pages/CompleteRegister';
import ResetPassword from './pages/Session/pages/ResetPassword';
import ForgotPassword from './pages/Session/pages/ForgotPassword';
import ForgotPasswordSuccess from './pages/Session/pages/ForgotPasswordSuccess';

import Landing from './pages/Landing';
import Home from './pages/Home';
import Perfil from './pages/Perfil';
import Datos from './pages/Emergencia/pages/Datos';
import Historias from './pages/Historias';
import Carga from './pages/Historias/pages/Carga';
import Verificacion from './pages/Verificacion';
import NotFound from './pages/NotFound';

import {
  UserIsAuthenticated,
  VisibleOnlyLoggedOut,
  UserIsMedico,
  UserIsPaciente,
} from './utils/session';


const Authenticated = UserIsAuthenticated(props => props.children);
const AllowOnlyUnauthenticated = VisibleOnlyLoggedOut(props => props.children);

export default function Routes({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={Landing} />
      <Route component={AllowOnlyUnauthenticated}>
        <Route path="register" component={Register} />
        <Route path="registerSuccess" component={RegisterSuccess} />
        <Route path="completeRegistration" component={CompleteRegister} />
        <Route path="login" component={Login} />
        <Route path="reset" component={ResetPassword} />
        <Route path="forgotPassword" component={ForgotPassword} />
        <Route path="forgotPasswordSuccess" component={ForgotPasswordSuccess} />
      </Route>
      <Route component={Authenticated}>
        <Route path="home" component={Home} />
        <Route path="perfil" component={Perfil} />
        {/* TODO: el medico solo puede editar si esta verificado y por cierto tiempo */}
        <Route path="datos/:pacienteId" component={Datos} />
        {/* TODO: hacer funcionar UserIsPaciente */}
        {/* <Route component={UserIsPaciente}> */}
          <Route path="historias" component={Historias} />
        {/* </Route> */}
        {/* TODO: hacer funcionar UserIsMedico */}
        {/* <Route component={UserIsMedico}> */}
          <Route path="verificacion" component={Verificacion} />
          <Route path="carga" component={Carga} />
        {/* </Route> */}
      </Route>
      <Route path="*" component={NotFound} />
    </Router>
  );
}

Routes.propTypes = {
  history: PropTypes.shape({}).isRequired,
};
