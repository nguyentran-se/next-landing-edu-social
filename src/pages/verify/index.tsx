import React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthContext } from 'contexts';
import { QueryKeys, useVerifyEmailMutation } from 'queries';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { VerifyEmailBody, VerifyEmailResponse } from '@types';
import LoadingButton from '@mui/lab/LoadingButton';
import { authApis } from 'apis';
import { FcGoogle } from 'react-icons/fc';
const VerifySchema = z.object({
  email: z.string().email(),
});
type VerifyFormInputs = z.infer<typeof VerifySchema>;
function VerifyPage() {
  const router = useRouter();
  const { verifiedEmail, setVerifiedEmail } = useAuthContext();
  const {
    register,
    handleSubmit,
    control,
    watch,
    unregister,
    clearErrors,
    formState: { errors },
  } = useForm<VerifyFormInputs>({
    mode: 'all',
    resolver: zodResolver(VerifySchema),
  });
  const { mutate: verifyMutate, error, isLoading } = useVerifyEmailMutation();

  function onSubmit(data: VerifyFormInputs) {
    const body = { email: data.email };
    verifyMutate(body, {
      onSuccess: (response) => {
        setVerifiedEmail(data.email);
        router.push({ pathname: '/login', query: { identifier: data.email } });
      },
    });
  }
  return (
    <Box
      sx={{
        width: '300px',
        height: '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto',
      }}
    >
      <Box>
        <Typography
          variant="subtitle1"
          color="initial"
          fontSize={45}
          fontWeight="100"
          textAlign={'center'}
        >
          FUniverse
        </Typography>
        <Box
          onSubmit={handleSubmit(onSubmit)}
          component="form"
          id="entityForm"
          // autoComplete="off"
          noValidate
          sx={{
            '& .MuiTextField-root': { m: 1, width: '100%' },
          }}
        >
          <InputLabel htmlFor="email" sx={{ color: 'black', fontWeight: 600, fontSize: '18px' }}>
            Enter your email to start using FUniverse
          </InputLabel>
          <TextField
            required
            error={Boolean(errors.email) || Boolean(error)}
            helperText={errors.email?.message || error}
            fullWidth
            autoFocus
            {...register('email')}
          />
          {/* <FormHelperText sx={{ color: 'red' }}>{error}</FormHelperText> */}
          <LoadingButton
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            loading={isLoading}
            loadingPosition="start"
            startIcon={null}
          >
            Continue
          </LoadingButton>
          <Button
            startIcon={<FcGoogle />}
            variant="contained"
            color="primary"
            fullWidth
            type="button"
            sx={{
              mt: 2,
              backgroundColor: '#fff',
              color: '#000',
              height: 42,
              '&:hover': {
                backgroundColor: 'rgba(255,255,255, 0.8)',
              },
            }}
            LinkComponent={MuiLink}
            href={process.env.NEXT_PUBLIC_GOOGLE_SIGNIN}
          >
            Sign in with Google
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default VerifyPage;
