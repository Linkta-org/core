import React from 'react';
import useDocumentTitle from '@hooks/useDocumentTitle';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Box, Typography, Link, TextField } from '@mui/material';
import styles from '@styles/layout/AuthStyles.module.css';
import { zodResolver } from '@hookform/resolvers/zod';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useGetPasswordResetLinkMutation } from '@/hooks/useGetPasswordResetLinkMutation';
import { userEmailSchema } from '@validators/validateUseremail';
import { useNotification } from '@hooks/useNotification';

interface FormData {
  email: string;
}

const ForgotPasswordPage = () => {
  useDocumentTitle('Forgot Password');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userEmailSchema),
  });

  const { mutate, isPending, isSuccess } = useGetPasswordResetLinkMutation();
  const { showNotification } = useNotification();

  const onSubmit: SubmitHandler<FormData> = async (data: { email: string }) => {
    const { email } = data;

    mutate(email, {
      onSuccess: () => {
        showNotification(
          'Password reset link sent to your email. Please check your inbox and spam folder.',
          'success',
        );
      },
      onError: (error: Error) => {
        console.error('Failed to send password reset email', error.message);

        showNotification(
          "We couldn't send the password reset email. Please verify your email address and try again.",
          'error',
          {
            duration: 6000,
          },
        );
      },
    });
  };

  return (
    <Box className={`${styles.signInPage}`}>
      <Typography
        variant='h3'
        mt={6}
        className={`${styles.headingText}`}
      >
        {isSuccess ? 'Check your email!' : 'Forgot your password?'}
      </Typography>

      <Typography
        sx={{ width: 400 }}
        mb={6}
        variant='body1'
      >
        Please provide the email you signed up with. We will send a secure link
        to reset your account password.
      </Typography>

      <form
        onSubmit={(e) => void handleSubmit(onSubmit)(e)}
        className={`${styles.authViewForm}`}
      >
        <TextField
          label='email address'
          variant='standard'
          type='email'
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
          className={`${styles.textInput}`}
          sx={{
            '& .MuiInput-underline:before': {
              borderBottomColor: '#D9D9D9 ',
            },
          }}
        ></TextField>
        <Button
          variant='contained'
          className={`${styles.formSubmitButton}`}
          type='submit'
        >
          {isPending ? 'Sending Link...' : 'Send Link'}
        </Button>
      </form>

      <Box className={`${styles.finePrintContainer}`}>
        <Typography variant='body2'>
          Already have an account?
          <Link
            component={RouterLink}
            to='/login'
          >
            Sign In
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

export default ForgotPasswordPage;
