import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Head from 'next/head';
// import styles from 'assets/styles/AboutPage.module.scss'

export default function AboutPage() {
  const theme = useTheme();
  const trigger = useScrollTrigger();

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
            About
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
            FUniverse is a next-generation social networking platform that offers a comprehensive
            solution tailored to the needs of educational institutions. As a unified platform, it
            serves as a one-stop destination that allows educational institutions to seamlessly
            connect and communicate with their students, teachers, and staff. With its cutting-edge
            features and user-friendly interface, FUniverse helps educational institutions to
            streamline their operations, foster collaboration, and build a strong sense of
            community. FUniverse is more than just a social networking platform. It is a
            comprehensive solution that provides educational institutions with the tools they need
            to enhance student engagement and learning outcomes. FUniverse offers a range of
            features that help educators to create engaging and interactive learning experiences,
            such as virtual classrooms, discussion forums, and multimedia resources. Additionally,
            FUniverse provides a range of administrative tools that enable educational institutions
            to manage everything from admissions to student records and reporting. At its core,
            FUniverse is a platform that is designed to enhance the educational experience for
            everyone involved. Whether you are a student, teacher, or administrator, FUniverse
            offers a range of features and functionalities that can help you achieve your goals.
            From streamlining administrative processes to enhancing collaboration and communication,
            FUniverse is the ideal platform for educational institutions looking to stay ahead of
            the curve in the digital age.
          </Typography>
        </Box>
      </Box>
      {/* </Box> */}
    </>
  );
}
