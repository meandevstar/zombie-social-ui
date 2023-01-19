import type { AxiosResponse } from 'axios';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CreateUser, UpdateUser, User, UserReport } from 'definitions/interfaces';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import * as api from 'api';

import {
  register as registerAction,
  getSurvivors as getSurvivorsAction,
  getUser as getUserAction,
  updateUser as updateUserAction,
  reportAsInfected as reportAsInfectedAction,
  setUser,
  setSurvivors,
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
    takeLatest(registerAction.type, register),
    takeLatest(getSurvivorsAction.type, getSurvivors),
    takeLatest(getUserAction.type, getUser),
    takeLatest(updateUserAction.type, updateUser),
    takeLatest(reportAsInfectedAction.type, reportAsInfected),
  ]);
}

export default sessionSaga;
