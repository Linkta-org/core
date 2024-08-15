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
import { useUpdatePasswordMutation } from '@/hooks/useUpdatePasswordMutation';
import { userPasswordSchema } from '@validators/validateUserPassword';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNotification } from '@hooks/useNotification';

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
  const { showNotification } = useNotification();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormData>({
    resolver: zodResolver(userPasswordSchema),
  });

  const { mutate, isPending } = useUpdatePasswordMutation();

  const onSubmit: SubmitHandler<FormData> = async (data: {
    password: string;
    confirmPassword: string;
  }) => {
    const { password } = data;

    if (!oobCode) {
      showNotification('No oobCode found.Please try again.', 'error', {
        duration: 6000,
      });
      return;
    }

    mutate(
      { oobCode, password },
      {
        onSuccess: () => {
          showNotification('Password updated successfully', 'success');
          setShouldNavigate(true);
        },
        onError: (error: Error) => {
          console.error('Failed to update password', error.message);
          showNotification(
            'Failed to update password. Please try again.',
            'error',
            {
              duration: 6000,
            },
          );
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
