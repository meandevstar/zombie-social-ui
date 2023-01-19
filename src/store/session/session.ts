import type { PayloadAction } from '@reduxjs/toolkit';
import type { CreateUser, UpdateUser, User, UserReport } from 'definitions/interfaces';
import { createAction, createSlice } from '@reduxjs/toolkit';

export interface SessionState {
  user: User | null;
  survivors: User[];
  loading: boolean;
}

const PREFIX = 'session';

const initialState: SessionState = {
  user: null,
  survivors: [],
  loading: false,
};

export const sessionSlice = createSlice({
  name: PREFIX,
  initialState,
  reducers: {
    setUser(state: SessionState, { payload }: PayloadAction<User>) {
      state.user = payload;
    },
    setSurvivors(state: SessionState, { payload }: PayloadAction<User[]>) {
      state.survivors = payload;
    },
    setLoading(state: SessionState, { payload }: PayloadAction<boolean>) {
      state.loading = payload;
    },
  },
});

export const { setUser, setSurvivors, setLoading } = sessionSlice.actions;
export const register = createAction<CreateUser>(`${PREFIX}/register`);
export const getUser = createAction<string>(`${PREFIX}/getUser`);
export const updateUser = createAction<UpdateUser>(`${PREFIX}/updateUser`);
export const getSurvivors = createAction(`${PREFIX}/getSurvivors`);
export const reportAsInfected = createAction<UserReport>(`${PREFIX}/reportAsInfected`);

export const { reducer: sessionReducer } = sessionSlice;
