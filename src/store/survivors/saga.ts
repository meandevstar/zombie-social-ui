import type { AxiosResponse } from 'axios';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Pagination, User, UserReport } from 'definitions/interfaces';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import * as api from 'api';

import {
  getSurvivors as getSurvivorsAction,
  reportAsInfected as reportAsInfectedAction,
  setSurvivors,
  setLoading,
  setTotal,
} from './survivors';
import { store } from 'store/store';
import { selectSurvivorsItemsPerPage, selectSurvivorsPage } from './selectors';

function* getSurvivors() {
  try {
    const state = store.getState();
    const page = selectSurvivorsPage(state);
    const itemsPerPage = selectSurvivorsItemsPerPage(state);
    yield put(setLoading(true));
    const result: AxiosResponse<Pagination<User>> =
      yield call(api.getSurvivors, { page: page - 1, limit: itemsPerPage });
    yield put(setTotal(result.data.total));
    yield put(setSurvivors(result.data.data));
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
