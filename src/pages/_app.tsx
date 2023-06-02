import { ThemeProvider } from '@mui/material/styles';
import { Roboto } from '@next/font/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import 'assets/styles/globals.scss';
import { AuthProvider } from 'contexts';
import { Layout } from 'layout';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { CookiesProvider } from 'react-cookie';
import { theme } from 'theme';

const roboto = Roboto({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['300', '400', '500', '700', '900'],
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  // useEffect(() => {
  //   // removeCookie(process.env.NEXT_PUBLIC_COOKIE_RT);
  //   // removeCookie(process.env.NEXT_PUBLIC_COOKIE_AT);
  //   // removeCookie('isWorkspaceActive');
  //   document.cookie = `${process.env.NEXT_PUBLIC_COOKIE_RT}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=funiverse.world; path=/;`;
  //   document.cookie = `${process.env.NEXT_PUBLIC_COOKIE_AT}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=funiverse.world; path=/;`;
  //   document.cookie = `isWorkspaceActive=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=funiverse.world; path=/;`;
  // }, []);
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${roboto.style.fontFamily};
          background-image: url('https://images.unsplash.com/photo-1518655048521-f130df041f66?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80');
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          height: 100vh;
          width: 100vw;
        }
      `}</style>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <CookiesProvider>
              <Layout>
                <Component {...pageProps} />
                <ReactQueryDevtools initialIsOpen={false} />
              </Layout>
            </CookiesProvider>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}
