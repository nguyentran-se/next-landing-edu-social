import axios, { AxiosError } from 'axios';
import qs from 'query-string';
// declare global {
//   module 'axios' {
//     export interface AxiosResponse<T = any> extends Promise<T> {}
//   }

// }
const axiosClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: 'http://authen.system.funiverse.world',
  paramsSerializer: { serialize: (params) => qs.stringify(params) },
  proxy: {
    host: 'http://localhost',
    port: 3001,
  },
});
axiosClient.interceptors.request.use(
  async (config) => {
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {},
);
axiosClient.interceptors.response.use(
  (response) => {
    return response?.data;
  },
  (error: AxiosError<{ message?: string }>) => {
    // console.log("🚀 ~ error:", error);
    const errorMsg = error.response?.data?.message ?? error.message;
    return Promise.reject(errorMsg);
  },
);

export default axiosClient;
