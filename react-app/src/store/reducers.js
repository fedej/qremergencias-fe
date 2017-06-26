import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

import DrawerState from './Drawer';

export default combineReducers({
  routing,
  drawer: DrawerState,
});
