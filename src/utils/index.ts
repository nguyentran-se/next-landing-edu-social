import { DecodedToken } from '@types';

export const __DEV__ = process.env.NODE_ENV === 'development';
export const decodeToken = (token: string) => {
  return JSON.parse(atob(token.split('.')[1])) as DecodedToken;
};
