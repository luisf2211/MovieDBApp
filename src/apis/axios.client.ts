import axios from 'axios';
import Constants from 'expo-constants';
import { Response } from '../types/ResponseTypes';

const axiosClient = axios.create({
    baseURL: Constants.expoConfig?.extra?.API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Constants.expoConfig?.extra?.MOVIE_DB_API_READ_ACCESS_TOKEN}`
    },
});

const get = async (url: string, params?: Record<string, any>) => {
    return axiosClient.get(url, { params });
};

const post = async (url: string, data?: Record<string, any>) => {
    return axiosClient.post(url, data);
};

const put = async (url: string, data?: Record<string, any>) => {
    return axiosClient.put(url, data);
};

const del = async (url: string, params?: Record<string, any>) => {
    return axiosClient.delete(url, { params });
};

export const response: Response<any> = {
    ok: (value) => ({
      ok: true,
      value,
      error: null,
    }),
    error: (error) => ({
      ok: false,
      value: null,
      error,
    }),
  };

export { get, post, put, del };
export default axiosClient;