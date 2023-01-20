import type { PayloadAction } from '@reduxjs/toolkit';
import type { Statistics } from 'definitions/interfaces';
import { createAction, createSlice } from '@reduxjs/toolkit';

export interface ReportsState {
  statistics: Statistics;
  loading: boolean;
}

const PREFIX = 'reports';

const initialState: ReportsState = {
  statistics: {
    normal: 0,
    infected: 0,
    resourceAverage: {
      AMMO: 0,
      FOOD: 0,
      MED: 0,
      WATER: 0
    },
    lostPoints: 0
  },
  loading: false,
};

export const reportsSlice = createSlice({
  name: PREFIX,
  initialState,
  reducers: {
    setStatistics(state: ReportsState, { payload }: PayloadAction<Statistics>) {
      state.statistics = payload;
    },
    setLoading(state: ReportsState, { payload }: PayloadAction<boolean>) {
      state.loading = payload;
    },
  },
});

export const { setStatistics, setLoading } = reportsSlice.actions;
export const getStatistics = createAction(`${PREFIX}/getStatistics`);

export const { reducer: reportsReducer } = reportsSlice;
