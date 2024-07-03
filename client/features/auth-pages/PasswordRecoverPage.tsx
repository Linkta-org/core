import React from 'react';
import useDocumentTitle from '@hooks/useDocumentTitle';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Box, Typography, Link, TextField } from '@mui/material';
import styles from '@styles/layout/AuthStyles.module.css';

const PasswordRecoverPage = () => {
  useDocumentTitle('Recover Password');

  return (
    <Box className={`${styles.signInPage}`}>
      <Typography
        variant='h3'
        mt={6}
        className={`${styles.headingText}`}
      >
        Forgot your password?
      </Typography>

      <Typography
        sx={{ width: 400 }}
        mb={6}
        variant='body1'
      >
        Please provide your registered email address. We will send a secure link
        to reset your account password.
      </Typography>

      <form className={`${styles.authViewForm}`}>
        <TextField
          placeholder='email address'
          variant='standard'
        ></TextField>
        <Button
          variant='contained'
          className={`${styles.formSubmitButton}`}
        >
          Reset Password
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

export default PasswordRecoverPage;