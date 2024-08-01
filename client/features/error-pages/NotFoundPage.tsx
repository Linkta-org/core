import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import styles from '@styles/NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <Box className={styles.box}>
      <Typography
        variant='h1'
        className={styles.headings}
      >
        404
      </Typography>
      <Typography
        variant='h2'
        className={styles.headings}
      >
        Page could not be found
      </Typography>
      <Typography
        variant='h5'
        className={styles.headings}
      >
        Oopsie! Looks like the page got lost.{' '}
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
          color='primary'
          aria-label='return to homepage'
        >
          Return to Homepage
        </Button>
      </RouterLink>
    </Box>
  );
};

export default NotFoundPage;
