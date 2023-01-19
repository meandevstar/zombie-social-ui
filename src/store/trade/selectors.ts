import { RootState } from 'store';

export const selectTradeUser = (state: RootState) => state.trade.user;
export const selectTradeError = (state: RootState) => state.trade.error;
export const selectTradeLoading = (state: RootState) => state.trade.loading;
