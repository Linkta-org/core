import React, { useEffect, useState } from 'react';
import useDocumentTitle from '@hooks/useDocumentTitle';
import {
  Link as RouterLink,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { Button, Box, Typography, Link, TextField } from '@mui/material';
import styles from '@styles/layout/AuthStyles.module.css';
import type { SubmitHandler } from 'react-hook-form';
import SnackBarNotification from '@components/common/SnackBarNotification';
import { useUpdatePasswordMutation } from '@/hooks/useUpdatePasswordMutation';
import { userPasswordSchema } from '@/zod/validateUserPassword';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface FormData {
  password: string;
  confirmPassword: string;
}

const PasswordUpdatePage = () => {
  useDocumentTitle('Update Password');
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const [searchParams] = useSearchParams();
  const oobCode = searchParams.get('oobCode');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormData>({
    resolver: zodResolver(userPasswordSchema),
  });

  const { mutate, isPending } = useUpdatePasswordMutation();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    'error' | 'warning' | 'info' | 'success'
  >('info');

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const onSubmit: SubmitHandler<FormData> = async (data: {
    password: string;
    confirmPassword: string;
  }) => {
    const { password, confirmPassword } = data;

    if (password !== confirmPassword) {
      setSnackbarMessage('Passwords do not match');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    if (!oobCode) {
      setSnackbarMessage('No oobCode found');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    mutate(
      { oobCode, password },
      {
        onSuccess: () => {
          setSnackbarMessage('Password updated successfully');
          setSnackbarSeverity('success');
          setSnackbarOpen(true);
          setShouldNavigate(true);
        },
        onError: (error: Error) => {
          setSnackbarMessage('Failed to update password');
          setSnackbarSeverity('error');
          setSnackbarOpen(true);
          console.error('Failed to update password', error.message);
        },
      },
    );
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ password: '', confirmPassword: '' });
    }
  }, [isSubmitSuccessful, reset]);

  useEffect(() => {
    if (shouldNavigate) {
      const timer = setTimeout(() => {
        setSnackbarOpen(false);
        navigate('/login');
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [shouldNavigate, navigate]);

  return (
    <Box className={`${styles.signInPage}`}>
      <Typography
        variant='h3'
        mt={6}
        className={`${styles.headingText}`}
      >
        Reset your password.
      </Typography>

      <Typography
        sx={{ maxWidth: 400 }}
        mb={6}
        variant='body1'
      >
        Enter a valid username and password to reset your password.
      </Typography>

      <form
        onSubmit={(e) => void handleSubmit(onSubmit)(e)}
        className={`${styles.authViewForm}`}
      >
        <TextField
          label='new password'
          variant='standard'
          type='password'
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
        ></TextField>
        <TextField
          label='confirm password'
          variant='standard'
          type='password'
          {...register('confirmPassword')}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
        ></TextField>
        <Button
          variant='contained'
          className={`${styles.formSubmitButton}`}
          type='submit'
        >
          {isPending ? 'Updating Password...' : 'Update Password'}
        </Button>
      </form>

      <SnackBarNotification
        callerUpdater={handleCloseSnackbar}
        message={snackbarMessage}
        open={snackbarOpen}
        severity={snackbarSeverity}
      />

      <Box className={`${styles.finePrintContainer}`}>
        <Typography variant='body2'>
          Already have an account?
          <Link
            component={RouterLink}
            to='/login'
          >
            Log In
          </Link>
        </Typography>

        <Typography
          variant='body2'
          className={`${styles.termsAndConditions}`}
        >
          By continuing, you are indicating that you have read and accept our
          <Link>Terms of Service</Link> and <Link>Privacy Policy</Link>.
        </Typography>
      </Box>
    </Box>
  );
};

export default PasswordUpdatePage;
