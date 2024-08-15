import React, { useEffect } from 'react';
import { Button, Box, Typography, Link, TextField } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import useDocumentTitle from '@hooks/useDocumentTitle';
import styles from '@styles/layout/AuthStyles.module.css';
import { useGoogleAuthMutation } from '@hooks/useSignInWithGoogle';
import { useGithubAuthMutation } from '@hooks/useSignInWithGitHub';
import { useCreateUserWithEmailAndPasswordMutation } from '@/hooks/useCreateUserWithEmailAndPassword';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import useCreateUserProfileMutation from '@/hooks/useCreateUserProfileMutation';
import useFetchUserProfile from '@/hooks/useFetchUserProfile';
import { useQueryClient } from '@tanstack/react-query';
import useAuth from '@/hooks/useAuth';
import { useNotification } from '@hooks/useNotification';

const userSignUpSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Please enter a password' }),
  name: z.string().min(1, { message: 'Please enter your name' }),
});

type FormData = z.infer<typeof userSignUpSchema>;

const SignUpPage = () => {
  useDocumentTitle('Sign Up');
  const navigate = useNavigate();
  const googleAuthMutation = useGoogleAuthMutation();
  const githubAuthMutation = useGithubAuthMutation();
  const createUserWithEmailAndPasswordMutation =
    useCreateUserWithEmailAndPasswordMutation();
  const createUserProfileMutation = useCreateUserProfileMutation();
  const queryClient = useQueryClient();
  const { data: userProfile } = useFetchUserProfile();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(userSignUpSchema) });
  const { isAuthenticated } = useAuth();
  const { showNotification } = useNotification();

  const handleAuthSuccess = async (name: string) => {
    if (!userProfile) {
      try {
        const response = await createUserProfileMutation.mutateAsync({ name });
        await queryClient.setQueryData(['userProfile'], response);
        showNotification(
          'Welcome to Linkta! Your account has been created successfully.',
          'success',
        );
        navigate('/generate');
      } catch (error) {
        console.error('Failed to create user profile:', error);
        showNotification(
          "We could't set up your profile. Please try again or contact support if the issue persists.",
          'error',
          {
            duration: 6000,
          },
        );
      }
    }
  };

  const handleGoogleAuthClick = async () => {
    try {
      await googleAuthMutation.mutateAsync();
      await handleAuthSuccess('');
    } catch (error) {
      console.error('Failed to sign up through Google:', error);
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
      console.error('Failed to sign up through GitHub', error);
      showNotification(
        'GitHub sign-in unsuccessful. Please try again or use another sign-in method.',
        'error',
        { duration: 6000 },
      );
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const { email, password, name } = data;

    try {
      await createUserWithEmailAndPasswordMutation.mutateAsync({
        email,
        password,
      });
      await handleAuthSuccess(name);
    } catch (error) {
      console.error('Failed to sign up through email:', error);
      showNotification(
        'Email sign-up unsuccessful. Please try again or use another sign-up method.',
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
          Sign Up
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
              alt='A Google "G" icon on the button to sign up with Google.'
            ></img>
            Sign Up with Google
          </Button>

          <Button
            variant='contained'
            className={`${styles.authButton}`}
            onClick={handleGithubAuthClick}
          >
            <img
              src='/github-icon.png'
              className={`${styles.buttonIcon}`}
              alt='A GitHub octocat icon on the button to sign up with GitHub.'
            ></img>
            Sign Up with GitHub
          </Button>
        </Box>

        <Typography variant='h6'>- OR -</Typography>

        <form
          onSubmit={(e) => void handleSubmit(onSubmit)(e)}
          className={`${styles.authViewForm}`}
        >
          <TextField
            label='full name'
            variant='standard'
            type='text'
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
          ></TextField>
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
            Create an Account
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

export default SignUpPage;
