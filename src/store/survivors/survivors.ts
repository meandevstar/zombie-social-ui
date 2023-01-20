import type { PayloadAction } from '@reduxjs/toolkit';
import type { User, UserReport } from 'definitions/interfaces';
import { createAction, createSlice } from '@reduxjs/toolkit';

export interface SurvivorsState {
  survivors: User[];
  page: number;
  loading: boolean;
}

const PREFIX = 'survivors';

const initialState: SurvivorsState = {
  survivors: [],
  page: 1,
  loading: false,
};

export const survivorsSlice = createSlice({
  name: PREFIX,
  initialState,
  reducers: {
    setSurvivors(state: SurvivorsState, { payload }: PayloadAction<User[]>) {
      state.survivors = payload;
    },
    setPage(state: SurvivorsState, { payload }: PayloadAction<number>) {
      state.page = payload;
    },
    setLoading(state: SurvivorsState, { payload }: PayloadAction<boolean>) {
      state.loading = payload;
    },
  },
});

export const { setSurvivors, setLoading } = survivorsSlice.actions;
export const getSurvivors = createAction(`${PREFIX}/getSurvivors`);
export const reportAsInfected = createAction<UserReport>(`${PREFIX}/reportAsInfected`);

export const { reducer: survivorsReducer } = survivorsSlice;
