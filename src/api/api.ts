import type { AxiosResponse } from 'axios';
import type {
  CreateUser,
  Trade,
  UpdateUser,
  User,
  UserReport,
  Statistics,
  PaginationParams,
  Pagination,
} from 'definitions/interfaces';

import { api } from './api-base';

export const getSurvivors = (params: PaginationParams): Promise<AxiosResponse<Pagination<User>>> =>
  api.get('/survivors', {
    params,
  });
export const getSurvivorById = (id: string): Promise<AxiosResponse<User>> =>
  api.get(`/survivors/${id}`);
export const updateSurvivor = ({ id, data }: UpdateUser): Promise<AxiosResponse<null>> =>
  api.put('/survivors', {
    id,
    data,
  });
export const reportAsInfected = (data: UserReport): Promise<AxiosResponse> =>
  api.post('/survivors/report-as-infected', data);
export const register = (params: CreateUser): Promise<AxiosResponse<User>> =>
  api.post('/survivors', params);
export const trade = (data: Trade): Promise<AxiosResponse> =>
  api.post('/trades', data);
export const getStatistics = (): Promise<AxiosResponse<Statistics>> =>
  api.get('/statistics');
