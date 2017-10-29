import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { persistStore } from 'redux-persist';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Spinner from 'react-spinkit';

import configure from './store';
import Routes from './routes';

import './main.css';

// Create an enhanced history that syncs navigation events with the store
const store = configure();
const history = syncHistoryWithStore(browserHistory, store);

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends React.Component {
  state = {
    isRehydrated: false,
  }

  componentWillMount() {
    persistStore(store, {
      blacklist: ['routing'],
    }, () => this.setState({ isRehydrated: true }));
  }

  render() {
    return (
      <Provider store={store}>
        {
          this.state.isRehydrated ? (
            <MuiThemeProvider>
              <Routes history={history} />
            </MuiThemeProvider>
          ) : (
            <div style={{ display: 'flex', flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'lightgrey' }}>
              <Spinner name="double-bounce" />
            </div>
          )
        }
      </Provider>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
