import React, { useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Button, Box, Typography, Link, TextField } from '@mui/material';
import styles from '@styles/layout/AuthStyles.module.css';
import { useGoogleAuthMutation } from '@hooks/useSignInWithGoogle';
import useDocumentTitle from '@hooks/useDocumentTitle';
import { useGithubAuthMutation } from '@hooks/useSignInWithGitHub';
import { useSignInWithEmailAndPasswordMutation } from '@/hooks/useSignInWithEmailAndPassword';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import useFetchUserProfile from '@/hooks/useFetchUserProfile';
import useCreateUserProfileMutation from '@/hooks/useCreateUserProfileMutation';
import { useQueryClient } from '@tanstack/react-query';
import useAuth from '@/hooks/useAuth';
import { useNotification } from '@hooks/useNotification';

const userSignInSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Please enter a password' }),
});

type FormData = z.infer<typeof userSignInSchema>;

const SignInPage = () => {
  useDocumentTitle('Sign In');
  const navigate = useNavigate();
  const googleAuthMutation = useGoogleAuthMutation();
  const githubAuthMutation = useGithubAuthMutation();
  const signInWithEmailAndPasswordMutation =
    useSignInWithEmailAndPasswordMutation();
  const { data: userProfile } = useFetchUserProfile();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(userSignInSchema) });
  const createUserProfileMutation = useCreateUserProfileMutation();
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();
  const { showNotification } = useNotification();

  const handleAuthSuccess = async (name: string) => {
    if (!userProfile) {
      try {
        const response = await createUserProfileMutation.mutateAsync({ name });
        await queryClient.setQueryData(['userProfile'], response);
        showNotification("Welcome back! You're now signed in.", 'success');
        navigate('/generate');
      } catch (error) {
        console.error('Failed to create user profile:', error);
      }
    }
  };

  const handleGoogleAuthClick = async () => {
    try {
      await googleAuthMutation.mutateAsync();
      await handleAuthSuccess('');
    } catch (error) {
      console.error('Failed to sign in through Google:', error);
      showNotification(
        'Google sign-in unsuccessful. Please try again or use another sign-in method.',
        'error',
        { duration: 6000 },
      );
    }
  };

  const handleGithubAuthClick = async () => {
    try {
      await githubAuthMutation.mutateAsync();
      await handleAuthSuccess('');
    } catch (error) {
      console.error('Failed to sign in through GitHub', error);
      showNotification(
        'GitHub sign-in unsuccessful. Please try again or use another sign-in method.',
        'error',
        { duration: 6000 },
      );
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const { email, password } = data;

    try {
      await signInWithEmailAndPasswordMutation.mutateAsync({ email, password });
      await handleAuthSuccess('');
    } catch (error) {
      console.error('Failed to sign in through email:', error);
      showNotification(
        'Email sign-in unsuccessful. Please try again or use another sign-in method.',
        'error',
        { duration: 6000 },
      );
    }
  };

  useEffect(() => {
    if (isAuthenticated && userProfile) {
      navigate('/generate');
    }
  }, [isAuthenticated, userProfile, navigate]);

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
            <Link>Terms of Service</Link> and <Link>Privacy Policy</Link>.
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default SignInPage;
