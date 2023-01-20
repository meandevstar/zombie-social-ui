import { RootState } from 'store';

export const selectSurvivors = (state: RootState) => state.survivors.survivors;
export const selectSurvivorsLoading = (state: RootState) => state.survivors.loading;
