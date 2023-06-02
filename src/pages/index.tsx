import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Head from 'next/head';
import Button from '@mui/material/Button';
// import styles from 'assets/styles/Home.module.scss'
import NextLink from 'next/link';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
export default function Home() {
  const theme = useTheme();
  const trigger = useScrollTrigger();
  const [cookies, setCookie, removeCookie] = useCookies();

  return (
    <>
      <Head>
        <title>Funiverse</title>
        <meta name="description" content="Funiverse" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Box
        sx={{
          height: `calc(100vh - ${trigger ? 64 : 80}px)`,
          marginTop: `${trigger ? 64 : 80}px`,
        }}> */}
      <Box>
        <Box sx={{ textAlign: 'center', overflow: 'auto' }}>
          <Typography
            variant="h2"
            fontWeight={500}
            sx={{ marginTop: 16 }}
            color="black"
            fontSize="40px"
          >
            Welcome to{' '}
            <Typography
              component="p"
              variant="h1"
              color={theme.palette.primary.main}
              fontWeight={500}
              fontSize="60px"
            >
              FUniverse
            </Typography>
          </Typography>
          <Typography
            component="p"
            variant="body1"
            width={500}
            margin="0 auto"
            color="black"
            fontSize="18px"
          >
            The all-in-one business communication platform from FUniverse that securely combines
            chat, groups and your intranet with the work tools you already use.
          </Typography>
          <Button
            sx={{ mt: 2 }}
            variant="contained"
            color="primary"
            LinkComponent={NextLink}
            href="/verify"
          >
            Get started
          </Button>
        </Box>
      </Box>
      {/* </Box> */}
    </>
  );
}
