import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import routes from './routes';
import createStore from './store/createStore';
import Perf from 'react-addons-perf';

const initialState = window.INITIAL_STATE;
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
