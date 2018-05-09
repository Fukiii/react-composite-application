import createSagaMiddleware from 'redux-saga';
import { SagaMiddleware } from 'redux-saga';
import { ConnectedRouter, routerMiddleware, push } from 'react-router-redux';
import { Store, createStore, applyMiddleware, Middleware } from 'redux';
import createHistory from 'history/createBrowserHistory';

import { root_reducer }  from 'src/redux/root_reducer';
import { RootSaga } from 'src/redux/root_saga';

let saga_middleware:SagaMiddleware<any>;
export let create_store_with_middleware = () => {
  const history = createHistory();
  saga_middleware = createSagaMiddleware();
  const router_middleware = routerMiddleware(history);
  const middlewares:Middleware[] = [
      saga_middleware,
      router_middleware,
    ].filter(Boolean);
  return applyMiddleware(
    ...middlewares,
  )(createStore);
};

// create_store
export const create_store = () => {
  var store = create_store_with_middleware()(
    root_reducer,
    DEBUG && (window as any).__REDUX_DEVTOOLS_EXTENSION__
      && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
  );
  saga_middleware.run(RootSaga);
  return store;
};
