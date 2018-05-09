import { fork, take } from 'redux-saga/effects';

export function* TestSaga() {
  while (true) {
    yield take('TEST');
  }
}