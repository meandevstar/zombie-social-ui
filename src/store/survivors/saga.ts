import type { AxiosResponse } from 'axios';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User, UserReport } from 'definitions/interfaces';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import * as api from 'api';

import {
  getSurvivors as getSurvivorsAction,
  reportAsInfected as reportAsInfectedAction,
  setSurvivors,
  setLoading,
} from './survivors';

function* getSurvivors() {
  try {
    yield put(setLoading(true));
    const result: AxiosResponse<User[]> =
      yield call(api.getSurvivors);
    yield put(setSurvivors(result.data));
    yield put(setLoading(false));
  } catch (error) {
    yield put(setLoading(false));
  }
}

function* reportAsInfected(action: PayloadAction<UserReport>) {
  try {
    yield put(setLoading(true));
    yield call(api.reportAsInfected, action.payload);
    yield put(setLoading(false));
    yield put(getSurvivorsAction());
  } catch (error) {
    yield put(setLoading(false));
  }
}

function* sessionSaga() {
  yield all([
    takeLatest(getSurvivorsAction.type, getSurvivors),
    takeLatest(reportAsInfectedAction.type, reportAsInfected),
  ]);
}

export default sessionSaga;
