import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { test_reducer } from './test_reducer';

export let root_reducer = combineReducers({
  router: routerReducer,
  test: test_reducer,
});