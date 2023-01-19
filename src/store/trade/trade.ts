import type { PayloadAction } from '@reduxjs/toolkit';
import type { Trade, User } from 'definitions/interfaces';
import { createAction, createSlice } from '@reduxjs/toolkit';

export interface TradeState {
  user: User | null;
  loading: boolean;
  error: string;
}

const PREFIX = 'trade';

const initialState: TradeState = {
  user: null,
  loading: false,
  error: '',
};

export const tradeSlice = createSlice({
  name: PREFIX,
  initialState,
  reducers: {
    setTradeUser(state: TradeState, { payload }: PayloadAction<User | null>) {
      state.user = payload;
    },
    setLoading(state: TradeState, { payload }: PayloadAction<boolean>) {
      state.loading = payload;
    },
    setError(state: TradeState, { payload }: PayloadAction<string>) {
      state.error = payload;
    },
  },
});

export const { setTradeUser, setLoading, setError } = tradeSlice.actions;
export const trade = createAction<Trade>(`${PREFIX}/trade`);

export const { reducer: tradeReducer } = tradeSlice;
