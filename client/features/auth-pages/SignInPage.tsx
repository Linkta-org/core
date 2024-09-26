import React from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Button, Box, Typography, Link, TextField } from '@mui/material';
import useDocumentTitle from '@hooks/useDocumentTitle';
import { useGoogleAuthMutation } from '@hooks/useSignInWithGoogle';
import { useGithubAuthMutation } from '@hooks/useSignInWithGitHub';
import { useSignInWithEmailAndPasswordMutation } from '@/hooks/useSignInWithEmailAndPassword';
import { useForm, type SubmitHandler } from 'react-hook-form';
import styles from '@styles/layout/AuthStyles.module.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNotification } from '@hooks/useNotification';
import { useQueryClient } from '@tanstack/react-query';

const userSignInSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Please enter a password' }),
});

type FormData = z.infer<typeof userSignInSchema>;

const SignInPage = () => {
  useDocumentTitle('Sign In');
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const googleAuthMutation = useGoogleAuthMutation();
  const githubAuthMutation = useGithubAuthMutation();
  const signInWithEmailAndPasswordMutation =
    useSignInWithEmailAndPasswordMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userSignInSchema),
  });
  const { showNotification } = useNotification();

  const handleGoogleAuthClick = async () => {
    try {
      await googleAuthMutation.mutateAsync().then(() => {
        void queryClient.invalidateQueries({ queryKey: ['getUserProfile'] });
        navigate('/generate');
      });
    } catch (error) {
      console.error('Failed to sign in via Google.', error);
      showNotification(
        'Google sign-in unsuccessful. Please try again or use another sign-in method.',
        'error',
        { duration: 6000 },
      );
      navigate('/home-page');
    }
  };

  const handleGithubAuthClick = async () => {
    try {
      await githubAuthMutation.mutateAsync().then(() => {
        void queryClient.invalidateQueries({ queryKey: ['getUserProfile'] });
        navigate('/generate');
      });
    } catch (error) {
      console.error('Failed to sign in via GitHub', error);
      showNotification(
        'GitHub sign-in unsuccessful. Please try again or use another sign-in method.',
        'error',
        { duration: 6000 },
      );
      navigate('/home-page');
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await signInWithEmailAndPasswordMutation.mutateAsync(data).then(() => {
        void queryClient.invalidateQueries({ queryKey: ['getUserProfile'] });
        navigate('/generate');
      });
    } catch (error) {
      console.error('Failed to sign up via Email/Password', error);
      showNotification(
        'Email/Password sign-up unsuccessful. Please try again or use another sign-up method.',
        'error',
        { duration: 6000 },
      );
      navigate('/home-page');
    }
  };

  return (
    <>
      <Box className={`${styles.signInPage}`}>
        <Typography
          variant='h3'
          className={`${styles.headingText}`}
        >
          Sign In
        </Typography>

        <Box className={`${styles.buttonWrapper}`}>
          <Button
            variant='contained'
            className={`${styles.authButton}`}
            onClick={handleGoogleAuthClick}
          >
            <img
              src='/google-icon.png'
              className={`${styles.buttonIcon}`}
              alt='A Google "G" icon on the button to sign in with Google.'
            ></img>
            Sign In with Google
          </Button>

          <Button
            variant='contained'
            className={`${styles.authButton}`}
            onClick={handleGithubAuthClick}
          >
            <img
              src='/github-icon.png'
              className={`${styles.buttonIcon}`}
              alt='A GitHub octocat icon on the button to sign in with GitHub.'
            ></img>
            Sign In with GitHub
          </Button>
        </Box>

        <Typography variant='h6'>- OR -</Typography>

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
          ></TextField>
          <TextField
            label='password'
            type='password'
            variant='standard'
            {...register('password')}
          ></TextField>
          <Button
            type='submit'
            variant='contained'
            className={`${styles.formSubmitButton}`}
          >
            Sign In to Linkta
          </Button>
        </form>

        <Box className={`${styles.finePrintContainer}`}>
          <Typography variant='body2'>
            Need to create an account?
            <Link
              component={RouterLink}
              to='/signup'
            >
              Sign Up
            </Link>
          </Typography>

          <Typography variant='body2'>
            Forgot your password?
            <Link
              component={RouterLink}
              to='/forgotten'
            >
              Update
            </Link>
          </Typography>

          <Typography
            variant='body2'
            className={`${styles.termsAndConditions}`}
          >
            By continuing, you are indicating that you have read and accept our
            <Link
              component={RouterLink}
              to='/terms-of-service'
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              component={RouterLink}
              to='/privacy-policy'
            >
              Privacy Policy
            </Link>
            .
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default SignInPage;
