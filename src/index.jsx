import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import movie from 'services/movie';
import routes from './routes';
import createStore from './store/createStore';

const initialState = window.INITIAL_STATE;
const store = createStore(initialState);

ReactDOM.render(
  <Provider store={store}>
    <Router>{ renderRoutes(routes) }</Router>
  </Provider>,
  document.getElementById('root')
);
