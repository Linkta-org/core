import React from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Button, Box, Typography, Link, TextField } from '@mui/material';
import styles from '@styles/layout/AuthStyles.module.css';
import { useGoogleAuthMutation } from '@/hooks/googleAuthMutation';
import useDocumentTitle from '@hooks/useDocumentTitle';

const SignInPage = () => {
  useDocumentTitle('Sign In');
  const navigate = useNavigate();
  const googleAuthMutation = useGoogleAuthMutation();

  const handleGoogleAuthClick = () => {
    googleAuthMutation.mutate(undefined, {
      onSuccess: (data) => {
        console.log('Signed in with GOOGLE AUTH SUCCESSFULLY', data);
        navigate('/home-page');
      },
    });
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

      <form className={`${styles.authViewForm}`}>
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
          Sign In
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
          Update your password?
          <Link
            component={RouterLink}
            to='/update-password'
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
  );
};

export default SignInPage;
