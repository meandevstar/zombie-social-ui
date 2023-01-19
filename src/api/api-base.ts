import type { AxiosInstance } from 'axios';
import axios from 'axios';

const BASEURL = process.env.REACT_APP_API_URL;

export const api: AxiosInstance = axios.create({
  baseURL: BASEURL,
  headers: {
    'content-type': 'application/json',
  },
});
