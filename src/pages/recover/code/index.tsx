import React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import FormHelperText from '@mui/material/FormHelperText';

import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthContext } from 'contexts';
import { useVerifyOTPMutation } from 'queries';
const VerifySchema = z.object({
  code: z.coerce.string().min(6),
});
type VerifyFormInputs = z.infer<typeof VerifySchema>;
function RecoverCodePage() {
  const router = useRouter();
  const { e: email } = router.query as { e: string };
  const { verifiedEmail, setVerifiedEmail } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyFormInputs>({
    mode: 'all',
    resolver: zodResolver(VerifySchema),
  });
  const verifyOTPMutation = useVerifyOTPMutation();
  function onSubmit(data: VerifyFormInputs) {
    verifyOTPMutation.mutate(
      { email, token: data.code },
      {
        onSuccess: () => {
          router.push(`/recover/password?e=${email}&t=${data.code}`);
        },
      },
    );
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
            Enter security code
          </Typography>
          <Typography
            variant="body1"
            color="initial"
            sx={{ transform: 'translateY(-12px)', whiteSpace: 'nowrap' }}
          >
            Please check your email for a message with your code. Your code is 6 numbers long.
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
          <TextField
            label="Code"
            type="number"
            required
            error={Boolean(errors.code)}
            helperText={errors.code?.message}
            fullWidth
            {...register('code')}
          />
          <FormHelperText sx={{ color: 'red' }}>
            {!errors.code?.message && verifyOTPMutation.isError ? verifyOTPMutation.error : ''}
          </FormHelperText>
          <LoadingButton
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            loading={verifyOTPMutation.isLoading}
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

export default RecoverCodePage;
