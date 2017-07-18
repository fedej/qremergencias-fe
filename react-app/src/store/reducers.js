import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

import auth from './Auth';
import navigation from './Navigation';
import drawer from './Drawer';
import historias from './Historias';

export default combineReducers({
  auth,
  routing,
  navigation,
  drawer,
  historias,
});
