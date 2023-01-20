import type { AxiosResponse } from 'axios';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CreateUser, UpdateUser, User } from 'definitions/interfaces';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import * as api from 'api';

import {
  register as registerAction,
  getUser as getUserAction,
  updateUser as updateUserAction,
  setUser,
  setLoading,
} from './session';

function* register(action: PayloadAction<CreateUser>) {
  try {
    yield put(setLoading(true));
    const result: AxiosResponse<User> =
      yield call(api.register, action.payload);
    yield put(setUser(result.data));
    yield put(setLoading(false));
  } catch (error) {
    yield put(setLoading(false));
  }
}

function* getUser(action: PayloadAction<string>) {
  try {
    yield put(setLoading(true));
    const result: AxiosResponse<User> =
      yield call(api.getSurvivorById, action.payload);
    yield put(setUser(result.data));
    yield put(setLoading(false));
  } catch (error) {
    yield put(setLoading(false));
  }
}

function* updateUser(action: PayloadAction<UpdateUser>) {
  try {
    yield put(setLoading(true));
    const result: AxiosResponse<User> =
      yield call(api.updateSurvivor, action.payload);
    yield put(setUser(result.data));
    yield put(setLoading(false));
  } catch (error) {
    yield put(setLoading(false));
  }
}

function* sessionSaga() {
  yield all([
    takeLatest(registerAction.type, register),
    takeLatest(getUserAction.type, getUser),
    takeLatest(updateUserAction.type, updateUser),
  ]);
}

export default sessionSaga;
