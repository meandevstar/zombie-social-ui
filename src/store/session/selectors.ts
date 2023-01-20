import { RootState } from 'store';

export const selectSessionUser = (state: RootState) => state.session.user;
export const selectSessionLoading = (state: RootState) => state.session.loading;
