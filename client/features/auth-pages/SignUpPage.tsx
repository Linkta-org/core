import React from 'react';
import { Button, Box, Typography, Link, TextField } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

import useDocumentTitle from '@hooks/useDocumentTitle';
import styles from '@styles/layout/AuthStyles.module.css';
import { useGoogleAuthMutation } from '@/hooks/googleAuthMutation';

const SignUpPage = () => {
  useDocumentTitle('Sign in');
  const navigate = useNavigate();
  const googleAuthMutation = useGoogleAuthMutation();

  const handleGoogleAuthClick = () => {
    googleAuthMutation.mutate(undefined, {
      onSuccess: () => {
        navigate('/generate');
      },
      onError: (error) => {
        console.error('something went wrong', error.message);
      },
    });
  };

  return (
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

      <form className={`${styles.authViewForm}`}>
        <TextField
          placeholder='full name'
          variant='standard'
        ></TextField>
        <TextField
          placeholder='email address'
          variant='standard'
        ></TextField>
        <TextField
          placeholder='password'
          variant='standard'
        ></TextField>
        <Button
          variant='contained'
          className={`${styles.formSubmitButton}`}
        >
          Create an Account
        </Button>
      </form>

      <Typography variant='body2'>
        Already have an account?
        <Link
          component={RouterLink}
          to='/userLogin'
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
  );
};

export default SignUpPage;
