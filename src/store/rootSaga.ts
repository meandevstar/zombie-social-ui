import { all, fork } from 'redux-saga/effects';

import sessionSaga from './session/saga';
import survivorsSaga from './survivors/saga';
import reportsSaga from './reports/saga';
import tradeSaga from './trade/saga';

export default function* rootSaga() {
  yield all([
    fork(sessionSaga),
    fork(survivorsSaga),
    fork(reportsSaga),
    fork(tradeSaga),
  ]);
}
