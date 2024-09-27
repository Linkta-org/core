import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import styles from '@styles/ErrorPage.module.css';

const ErrorPage = () => {
  return (
    <Box className={styles.box}>
      <Typography
        variant='h1'
        className={styles.h1}
      >
        Oopsie!
      </Typography>
      <Typography
        variant='h2'
        className={styles.subheadings}
      >
        This is Awkward...
      </Typography>
      <Typography
        variant='h5'
        className={styles.subheadings}
      >
        Looks like we ran into an issue.{' '}
        <RouterLink
          to='/help'
          className={styles.link}
        >
          Report it to help us fix it!
        </RouterLink>
      </Typography>
      <RouterLink to='/'>
        <Button
          className={styles.button}
          variant='contained'
          color='secondary'
        >
          Return to Homepage
        </Button>
      </RouterLink>
    </Box>
  );
};

export default ErrorPage;
