import { useMutation, useQuery } from '@tanstack/react-query';
import { LoginBody, LoginResponse, UserRoles, VerifyEmailBody, VerifyEmailResponse } from '@types';
import { authApis } from 'apis';
import { useRouter } from 'next/router';
import { QueryKeys } from 'queries';
import { useCookies } from 'react-cookie';
import { __DEV__, decodeToken } from 'utils';
export function useVerifyEmailMutation() {
  const router = useRouter();

  const verifyEmailMutation = useMutation<VerifyEmailResponse, string, VerifyEmailBody, unknown>({
    mutationFn: (body) => authApis.verifyEmail(body),
    onError: () => router.push('/verify'),
  });
  return verifyEmailMutation;
}

export function useLoginMutation() {
  const [cookies, setCookie, removeCookie] = useCookies();
  const loginMutation = useMutation<LoginResponse, string, LoginBody>({
    mutationFn: (body) => authApis.login(body),
    onSuccess: (response) => {
      removeCookie(process.env.NEXT_PUBLIC_COOKIE_RT);
      removeCookie(process.env.NEXT_PUBLIC_COOKIE_AT);
      removeCookie('isWorkspaceActive');
      const { accessToken, refreshToken, user, workspaceDomain } = response;
      const now = new Date();
      const expires = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());
      const { wstatus } = decodeToken(accessToken);

      setCookie(process.env.NEXT_PUBLIC_COOKIE_RT, refreshToken, {
        domain: __DEV__ ? 'localhost' : process.env.NEXT_PUBLIC_DOMAIN,
        expires,
      });
      setCookie(process.env.NEXT_PUBLIC_COOKIE_AT, accessToken, {
        domain: __DEV__ ? 'localhost' : process.env.NEXT_PUBLIC_DOMAIN,
        expires,
      });

      let redirectURL = null;
      switch (user.role) {
        case UserRoles.SystemAdmin:
          redirectURL = process.env.NEXT_PUBLIC_FU_SA_URL;
          break;
        case UserRoles.WorkspaceAdmin:
          if (wstatus) redirectURL = `http://admin.${workspaceDomain}`;
          else redirectURL = `http://admin.${workspaceDomain}/onboard`;
          setCookie('isWorkspaceActive', wstatus, {
            domain: __DEV__ ? 'localhost' : process.env.NEXT_PUBLIC_DOMAIN,
            expires,
          });
          break;
        default:
          redirectURL = `http://${workspaceDomain}`;
          break;
      }
      if (__DEV__) {
        window.location.href =
          user.role !== UserRoles.WorkspaceAdmin ||
          (user.role === UserRoles.WorkspaceAdmin && wstatus)
            ? 'http://localhost:3000/'
            : 'http://localhost:3000/onboard';
        return;
      }
      window.location.href = redirectURL;
    },
  });
  return loginMutation;
}

export function useOTPEmailQuery() {
  return useQuery({
    queryKey: [QueryKeys.OTP],
    queryFn: () => authApis.getOTPInEmail,
  });
}

export function useVerifyOTPMutation() {
  return useMutation<unknown, string, { email: string; token: string }>({
    mutationFn: (body) => authApis.verifyEmail(body),
  });
}

export function useResetPasswordMutation() {
  const router = useRouter();
  return useMutation<LoginResponse, unknown, { email: string; password: string }, unknown>({
    mutationFn: (body) => authApis.resetPassword(body),
    onSuccess: (response) => router.push(`/login?identifier=${response.user.eduMail}`),
  });
}
