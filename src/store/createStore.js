import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from '../reducers';

export default (initialState = {}) => {
  const middleware = [thunk];

  if (process.env.NODE_ENV === 'dev') {
    const logger = createLogger();
    middleware.push(logger);
  }

  const store = createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(...middleware)
    )
  );

  return store;
};
