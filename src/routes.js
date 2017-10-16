import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route } from 'react-router';

import Login from './pages/Session/pages/Login';
import Register from './pages/Session/pages/Register';
import RegisterSuccess from './pages/Session/pages/RegisterSuccess';
import CompleteRegister from './pages/Session/pages/CompleteRegister';
import ResetPassword from './pages/Session/pages/ResetPassword';
import ForgotPassword from './pages/Session/pages/ForgotPassword';
import ForgotPasswordSuccess from './pages/Session/pages/ForgotPasswordSuccess';

import Landing from './pages/Landing';
import Home from './pages/Home';
import HomePage from './pages/HomePage';
import Perfil from './pages/Perfil';
import EditarPaciente from './pages/Paciente/pages/Editar';
import HistoriasPaciente from './pages/Paciente/pages/Historias';
import Cambios from './pages/Paciente/pages/Cambios';
import CodigoQR from './pages/Paciente/pages/QR';
import DatosEmergenciaPaciente from './pages/Paciente/pages/Datos';
import Historias from './pages/Historias';
import Datos from './pages/Datos';
import Carga from './pages/Historias/pages/Carga';
import Verificacion from './pages/Verificacion';
import NotFound from './pages/NotFound';

import {
  UserIsAuthenticated,
  VisibleOnlyLoggedOut,
  UserIsPaciente,
  UserIsMedico,
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
        <Route path="homePage" component={HomePage} />
        <Route path="cambios" component={UserIsPaciente(Cambios)} />
        <Route path="historias" component={UserIsPaciente(Historias)} />
        <Route path="codigo" component={UserIsPaciente(CodigoQR)} />
        <Route path="datosEmergencia" component={UserIsPaciente(DatosEmergenciaPaciente)} />

        <Route path="verificacion" component={UserIsMedico(Verificacion)} />
        <Route path="datos" component={UserIsMedico(Datos)} />
        <Route path="editar" component={UserIsMedico(EditarPaciente)} />
        <Route path="carga" component={UserIsMedico(Carga)} />
        <Route path="historiasPaciente" component={UserIsMedico(HistoriasPaciente)} />

      </Route>
      <Route path="*" component={NotFound} />
    </Router>
  );
}

Routes.propTypes = {
  history: PropTypes.shape({}).isRequired,
};
