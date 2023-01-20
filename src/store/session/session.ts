import type { PayloadAction } from '@reduxjs/toolkit';
import type { CreateUser, UpdateUser, User } from 'definitions/interfaces';
import { createAction, createSlice } from '@reduxjs/toolkit';

export interface SessionState {
  user: User | null;
  loading: boolean;
}

const PREFIX = 'session';

const initialState: SessionState = {
  user: null,
  loading: false,
};

export const sessionSlice = createSlice({
  name: PREFIX,
  initialState,
  reducers: {
    setUser(state: SessionState, { payload }: PayloadAction<User>) {
      state.user = payload;
    },
    setLoading(state: SessionState, { payload }: PayloadAction<boolean>) {
      state.loading = payload;
    },
  },
});

export const { setUser, setLoading } = sessionSlice.actions;
export const register = createAction<CreateUser>(`${PREFIX}/register`);
export const getUser = createAction<string>(`${PREFIX}/getUser`);
export const updateUser = createAction<UpdateUser>(`${PREFIX}/updateUser`);

export const { reducer: sessionReducer } = sessionSlice;
