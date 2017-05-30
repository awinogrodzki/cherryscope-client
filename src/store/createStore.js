import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from '../reducers';

export default (initialState = {}) => {
  const middleware = [thunk];
  const isDev = process.env.NODE_ENV === 'dev';

  if (isDev) {
    const logger = createLogger();
    middleware.push(logger);
  }

  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose;
  /* eslint-enable */

  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware)
    )
  );

  return store;
};
