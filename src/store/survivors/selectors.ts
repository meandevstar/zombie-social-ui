import { RootState } from 'store';

export const selectSurvivors = (state: RootState) => state.survivors.survivors;
export const selectSurvivorsPage = (state: RootState) => state.survivors.page;
export const selectSurvivorsItemsPerPage = (state: RootState) => state.survivors.itemsPerPage;
export const selectSurvivorsTotal = (state: RootState) => state.survivors.total;
export const selectSurvivorsLoading = (state: RootState) => state.survivors.loading;
