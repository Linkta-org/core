import React from 'react';
import useDocumentTitle from '@hooks/useDocumentTitle';
import { Button, Box, Typography, Link, TextField } from '@mui/material';
import styles from '@styles/layout/AuthStyles.module.css';

const SignUpPage = () => {
  useDocumentTitle('Sign in');
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
        >
          <img
            src='../assets/google-icon.png'
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
            src='../assets/github-icon.png'
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
        <Link>Sign In</Link>
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
