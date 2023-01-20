import type { Statistics } from 'definitions/interfaces';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import * as api from 'api';

import { getStatistics as getStatisticsAction, setStatistics, setLoading } from './reports';
import { AxiosResponse } from 'axios';

function* getStatistics() {
  try {
    yield put(setLoading(true));
    const res: AxiosResponse<Statistics> = yield call(api.getStatistics);
    yield put(setStatistics(res.data));
    yield put(setLoading(false));
  } catch (error) {
    yield put(setLoading(false));
  }
}

function* statisticsSaga() {
  yield all([
    takeLatest(getStatisticsAction.type, getStatistics),
  ]);
}

export default statisticsSaga;
