import { fork } from 'redux-saga/effects';

export function* RootSaga() {
  yield fork(require('./test_saga').TestSaga);
}