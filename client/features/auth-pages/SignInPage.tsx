import React from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Button, Box, Typography, Link, TextField } from '@mui/material';

import styles from '@styles/layout/AuthStyles.module.css';
import { useGoogleAuthMutation } from '@/hooks/googleAuthMutation';
import useDocumentTitle from '@hooks/useDocumentTitle';
import { useGithubAuthMutation } from '@hooks/useSignInWithGitHub';
import { useSignInWithEmailAndPasswordMutation } from '@/hooks/useSignInWithEmailAndPassword';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Please enter a password' }),
});

type FormData = z.infer<typeof schema>;

const SignInPage = () => {
  useDocumentTitle('Sign in');
  const navigate = useNavigate();
  const googleAuthMutation = useGoogleAuthMutation();
  const githubAuthMuation = useGithubAuthMutation();
  const signInWithEmailAndPasswordMutation =
    useSignInWithEmailAndPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleGoogleAuthClick = () => {
    googleAuthMutation.mutate(undefined, {
      onSuccess: (data) => {
        console.log('Signed in with GOOGLE AUTH SUCCESSFULLY', data);
        navigate('/generate');
      },
    });
  };

  const handleGithubAuthClick = () => {
    githubAuthMuation.mutate(undefined, {
      onSuccess: (data) => {
        console.log('Signed in with GOOGLE AUTH SUCCESSFULLY', data);
        navigate('/generate');
      },
    });
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const { email, password } = data;
    console.log('email', email);

    signInWithEmailAndPasswordMutation.mutate(
      { email, password },
      {
        onSuccess: (res) => {
          console.log('SIGNED IN with USER PASSWORD AUTH SUCCESSFULLY', res);
          navigate('/generate');
        },
        onError: (error) => {
          console.error('something went wrong', error.message);
        },
      },
    );
  };

  return (
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
            src='../assets/google-icon.png'
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
            src='../assets/github-icon.png'
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
          label='full name'
          variant='standard'
          type='text'
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
          Sign In to Linkta
        </Button>
      </form>

      <Typography variant='body2'>
        Need to create an account?
        <Link
          component={RouterLink}
          to='/userSignup'
        >
          Sign Up
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
  );
};

export default SignInPage;
