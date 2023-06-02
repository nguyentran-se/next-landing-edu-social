import { LoginBody, LoginResponse, VerifyEmailBody, VerifyEmailResponse } from '@types';
import axiosClient from './axiosClient';

export const authApis = {
  verifyEmail: (body: VerifyEmailBody) =>
    axiosClient.post<VerifyEmailResponse>('/auth/verify-mail', body),
  login: (body: LoginBody) => axiosClient.post<LoginResponse>('/auth/login', body),
  // logout: (body: ) => axiosClient.post('/api/v1/auth/logout'),
  refreshToken: () => axiosClient.post('/auth/refresh-token'),

  verifyOTP: (data: { email: string; token: string }) => axiosClient.put('/auth/verify', data),
  getOTPInEmail: (params: { email: string }) => axiosClient.get('/auth/reset-password', { params }),
  resetPassword: (data: { email: string; password: string }) =>
    axiosClient.post('/auth/reset-password', data),
};
