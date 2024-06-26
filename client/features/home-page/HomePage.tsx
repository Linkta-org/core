import React from 'react';
import useDocumentTitle from '@hooks/useDocumentTitle';
import { Box, Typography } from '@mui/material';
import styles from '@features/home-page/Homepage.module.css';

const HomePage = () => {
  useDocumentTitle();
  return (
    <Box className={`${styles.homeContainer}`}>
      <Box className={`${styles.copyContainer}`}>
        <Typography variant='h4'>
          Revolutionizing Learning: Intuitive Visualization for Complex Concepts
        </Typography>
        <Typography
          variant='body2'
          className={`${styles.bodyText}`}
        >
          Experience a new era of understanding, where concepts become clear and
          logic flows effortlessly, making the path from confusion to clarity both
          intuitive and accessible.
        </Typography>
      </Box>
      <img
        className={`${styles.homeImage}`}
        alt='A static image of a 3D model showing various gadgets and widgets.'
        src='../../assets/Linkta-Landing.png'
      >
      </img>
    </Box>
  );
};

export default HomePage;
