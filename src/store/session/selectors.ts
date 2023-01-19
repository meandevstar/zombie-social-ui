import { RootState } from 'store';

export const selectSessionUser = (state: RootState) => state.session.user;
export const selectSessionSurvivors = (state: RootState) => state.session.survivors;
export const selectSessionLoading = (state: RootState) => state.session.loading;
