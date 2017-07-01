import { createStore, compose, applyMiddleware } from 'redux';
import { autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';

import { logger } from './middleware';
import rootReducer from './reducers';

export default function configure(preloadedState) {
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(rootReducer, preloadedState, composeEnhancers(
     applyMiddleware(
       thunk,
       logger,
     ),
     autoRehydrate(),
  ));
  /* eslint-enable */

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('./reducers', () => {
        store.replaceReducer(rootReducer);
      });
    }
  }

  return store;
}
