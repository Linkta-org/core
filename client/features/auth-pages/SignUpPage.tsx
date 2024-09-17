import React from 'react';
import { Button, Box, Typography, Link, TextField } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import useDocumentTitle from '@hooks/useDocumentTitle';
import styles from '@styles/layout/AuthStyles.module.css';
import { useGoogleAuthMutation } from '@hooks/useSignInWithGoogle';
import { useGithubAuthMutation } from '@hooks/useSignInWithGitHub';
import { useCreateUserWithEmailAndPasswordMutation } from '@hooks/useCreateUserWithEmailAndPassword';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNotification } from '@hooks/useNotification';
import { useCreateUserProfile } from '@hooks/useUserCrudOperations';
import { useQueryClient } from '@tanstack/react-query';

const userSignUpSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Please enter a password' }),
  name: z.string().min(1, { message: 'Please enter your name' }),
});

type FormData = z.infer<typeof userSignUpSchema>;

const SignUpPage = () => {
  useDocumentTitle('Sign Up');
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const googleAuthMutation = useGoogleAuthMutation();
  const githubAuthMutation = useGithubAuthMutation();
  const newUserProfile = useCreateUserProfile('Sign Up Page');
  const createUserWithEmailAndPasswordMutation =
    useCreateUserWithEmailAndPasswordMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(userSignUpSchema) });
  const { showNotification } = useNotification();

  const handleGoogleAuthClick = async () => {
    try {
      await googleAuthMutation
        .mutateAsync()
        .then(async () => {
          await newUserProfile.mutateAsync();
        })
        .then(() => {
          void queryClient.invalidateQueries({ queryKey: ['getUserProfile'] });
          navigate('/generate');
        });
    } catch (error) {
      console.error('Failed to sign in via Google.', error);
      showNotification(
        'Google sign-up unsuccessful. Please try again or use another sign-up method.',
        'error',
        { duration: 6000 },
      );
      navigate('/home-page');
    }
  };

  const handleGithubAuthClick = async () => {
    try {
      await githubAuthMutation
        .mutateAsync()
        .then(async () => {
          await newUserProfile.mutateAsync();
        })
        .then(() => {
          void queryClient.invalidateQueries({ queryKey: ['getUserProfile'] });
          navigate('/generate');
        });
    } catch (error) {
      console.error('Failed to sign up via GitHub', error);
      showNotification(
        'GitHub sign-up unsuccessful. Please try again or use another sign-up method.',
        'error',
        { duration: 6000 },
      );
      navigate('/home-page');
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await createUserWithEmailAndPasswordMutation
        .mutateAsync(data)
        .then(async () => {
          await newUserProfile.mutateAsync();
        })
        .then(() => {
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
