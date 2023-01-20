import { RootState } from 'store';

export const selectReportsStatistics = (state: RootState) => state.reports.statistics;
export const selectReportsLoading = (state: RootState) => state.reports.loading;
