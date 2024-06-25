import React from 'react';
import useDocumentTitle from '@hooks/useDocumentTitle';
import { Button, Box, Typography, Link, TextField } from '@mui/material';
import styles from '@styles/layout/AuthStyles.module.css';

const SignInPage = () => {
  useDocumentTitle('Sign in');
  return (
    <Box className={`${styles.signInPage}`}>

      <Typography variant='h3' className={`${styles.headingText}`}>Sign In</Typography>

      <Box className={`${styles.buttonWrapper}`}>

        <Button variant='contained' className={`${styles.authButton}`}>
          <img src='../assets/google-icon.png' className={`${styles.buttonIcon}`}></img>
          Sign In with Google
        </Button>

        <Button variant='contained' className={`${styles.authButton}`}>
          <img src='../assets/github-icon.png' className={`${styles.buttonIcon}`}></img>
          Sign In with GitHub
        </Button>

      </Box>

      <Typography variant='h6'>- OR -</Typography>

      <form className={`${styles.authViewForm}`}>
        <TextField placeholder='email address' variant='standard'></TextField>
        <TextField placeholder='password' variant='standard'></TextField>
        <Button variant='contained' className={`${styles.formSubmitButton}`}>Sign In</Button>
      </form>

      <Typography variant='body2'>Forgot your password?
        <Link>Reset</Link>
      </Typography>

      <Typography variant='body2' className={`${styles.termsAndConditions}`}>
        By continuing, you are indicating that you have read and accept our
        <Link>Terms of Service</Link> and <Link>Privacy Policy</Link>.
      </Typography>

    </Box>
  );
};

export default SignInPage;
