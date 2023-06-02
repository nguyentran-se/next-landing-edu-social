import { zodResolver } from '@hookform/resolvers/zod';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import { useAuthContext } from 'contexts';
import { useRouter } from 'next/router';
import { useResetPasswordMutation, useVerifyOTPMutation } from 'queries';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import LoadingButton from '@mui/lab/LoadingButton';

import { z } from 'zod';
const RecoverPasswordSchema = z.object({
  password: z.string().min(1),
});
type RecoverPasswordFormInputs = z.infer<typeof RecoverPasswordSchema>;
function RecoverPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const { e: emailQuery, t: tokenQuery } = router.query as {
    e?: string;
    t?: string;
  };
  const { verifiedEmail, setVerifiedEmail } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecoverPasswordFormInputs>({
    mode: 'all',
    resolver: zodResolver(RecoverPasswordSchema),
  });
  const verifyOTPMutation = useVerifyOTPMutation();
  useEffect(() => {
    if (!emailQuery || !tokenQuery) {
      router.push('/verify');
      return;
    }

    verifyOTPMutation.mutate(
      { email: emailQuery, token: tokenQuery },
      {
        onError: () => router.push('/verify'),
      },
    );

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailQuery, tokenQuery]);

  const resetPasswordMutation = useResetPasswordMutation();

  function onSubmit(data: RecoverPasswordFormInputs) {
    if (!emailQuery) return;
    resetPasswordMutation.mutate({
      email: emailQuery,
      password: data.password,
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
        <Box
          sx={{
            mb: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="subtitle1" color="initial" fontSize={45} fontWeight="100">
            Choose a new password
          </Typography>
          <Typography
            variant="body1"
            color="initial"
            sx={{ transform: 'translateY(-12px)', whiteSpace: 'nowrap' }}
          >
            Create a strong password with at least 8 characters. Mix numbers with uppercase and
            lowercase letters.
          </Typography>
        </Box>
        <Box
          onSubmit={handleSubmit(onSubmit)}
          component="form"
          id="entityForm"
          autoComplete="off"
          noValidate
          sx={{
            '& .MuiTextField-root': { m: 1, width: '100%' },
            width: 350,
            m: '0 auto',
          }}
        >
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((show) => !show)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              error={Boolean(errors.password)}
              autoFocus
              {...register('password')}
            />
            <FormHelperText sx={{ color: 'red' }}>{errors.password?.message}</FormHelperText>
          </FormControl>
          <LoadingButton
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            loading={resetPasswordMutation.isLoading}
            loadingPosition="start"
            startIcon={null}
          >
            Continue
          </LoadingButton>
        </Box>
      </Box>
    </Box>
  );
}

export default RecoverPasswordPage;
