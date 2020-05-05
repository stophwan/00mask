import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers/index';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers( applyMiddleware(logger, thunk)));
const theme = createMuiTheme({
  palette: {
    type: 'light',
  },
});


ReactDOM.render(
  <Provider store = {store}>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </React.StrictMode> 
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
