import React from 'react';
import useDocumentTitle from '@hooks/useDocumentTitle';
import { Box, Typography } from '@mui/material';
import styles from '@features/home-page/Homepage.module.css';

const HomePage = () => {
  useDocumentTitle();
  return (
    <Box className={`${styles.homeContainer}`}>
      <Typography variant='h4'>
        Revolutionizing Learning:
        Intuitive Visualization for Complex Concepts
      </Typography>
      <Typography variant='body2' className={`${styles.bodyText}`}>
        Experience a new era of understanding, where concepts become clear and logic flows effortlessly, making the path from confusion to clarity both intuitive and accessible.
      </Typography>
      <Box className={`${styles.imagePlaceholder}`}>
        <Typography variant='h6' color='secondary'>Placeholder</Typography>
      </Box>
    </Box>
  );
};

export default HomePage;
