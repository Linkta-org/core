import React from 'react';
import useDocumentTitle from '@hooks/useDocumentTitle';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Box, Typography, Link, TextField } from '@mui/material';
import styles from '@styles/layout/AuthStyles.module.css';

const PasswordUpdatePage = () => {
  useDocumentTitle('Update Password');

  return (
    <Box className={`${styles.signInPage}`}>
      <Typography
        variant='h3'
        mt={6}
        className={`${styles.headingText}`}
      >
        Reset your password.
      </Typography>

      <Typography
        sx={{ maxWidth: 400 }}
        mb={6}
        variant='body1'
      >
        Enter a valid username and password to reset your password.
      </Typography>

      <form className={`${styles.authViewForm}`}>
        <TextField
          placeholder='new password'
          variant='standard'
        ></TextField>
        <TextField
          placeholder='confirm password'
          variant='standard'
        ></TextField>
        <Button
          variant='contained'
          className={`${styles.formSubmitButton}`}
        >
          Update Password
        </Button>
      </form>

      <Box className={`${styles.finePrintContainer}`}>
        <Typography variant='body2'>
          Already have an account?
          <Link
            component={RouterLink}
            to='/login'
          >
            Log In
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

export default PasswordUpdatePage;
