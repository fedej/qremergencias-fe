import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import configure from './store';

import Login from './pages/Login';
import Register from './pages/Register';

import Home from './pages/Home';
import Perfil from './pages/Perfil';
import Datos from './pages/Datos';
import Historia from './pages/Historia';
import Codigo from './pages/Codigo';


// Create an enhanced history that syncs navigation events with the store
const store = configure();
const history = syncHistoryWithStore(browserHistory, store);

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Router history={history}>
        <Route path="register" component={Register} />
        <Route path="login" component={Login} />
        <Route path="/" component={Home}>
          <Route path="datos" component={Datos} />
          <Route path="perfil" component={Perfil} />
          <Route path="historia" component={Historia} />
          <Route path="codigo" component={Codigo} />
        </Route>
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root'),
);
