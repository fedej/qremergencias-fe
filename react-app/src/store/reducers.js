import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

import auth from './Auth';
import navigation from './Navigation';
import drawer from './Drawer';
import profile from './Perfil';

export default combineReducers({
  auth,
  routing,
  navigation,
  drawer,
  profile,
});
