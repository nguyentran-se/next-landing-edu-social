import { UserRoles } from './user';

export interface DecodedToken {
  role: UserRoles;
  domain: string;
  username: string;
  sub: string;
  iat: number;
  exp: number;
  wstatus: boolean;
}
