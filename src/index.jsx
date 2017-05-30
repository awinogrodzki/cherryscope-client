import React from 'react';
import ReactDOM from 'react-dom';
import Perf from 'react-addons-perf';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import routes from './routes';
import createStore from './store/createStore';

/* eslint-disable no-underscore-dangle */
const initialState = window.__INITIAL_STATE__;
/* eslint-enable no-underscore-dangle */

const store = createStore(initialState);

if (process.env.NODE_ENV === 'dev') {
  window.Perf = Perf;
}

ReactDOM.render(
  <Provider store={store}>
    <Router>{ renderRoutes(routes) }</Router>
  </Provider>,
  document.getElementById('root')
);
