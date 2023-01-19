import type { AxiosError } from 'axios';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Trade } from 'definitions/interfaces';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import * as api from 'api';

import { trade as tradeAction, setLoading, setError, setTradeUser } from './trade';
import { getSurvivors } from 'store/session';

function* trade(action: PayloadAction<Trade>) {
  try {
    yield put(setLoading(true));
    yield call(api.trade, action.payload);
    yield put(setLoading(false));
    yield put(setTradeUser(null));
    yield put(getSurvivors());
    yield put(setError(''));
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    yield put(setLoading(false));
    yield put(setError(axiosError.response?.data?.message || ''));
  }
}

function* tradeSaga() {
  yield all([
    takeLatest(tradeAction.type, trade),
  ]);
}

export default tradeSaga;
