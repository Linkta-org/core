import React from 'react';
import { CircularProgress, Typography, Box } from '@mui/material';
import styles from '@styles/Loader.module.css';

const Loader = () => (
  <Box className={styles.loaderContainer}>
    <CircularProgress size={50} />
    <Typography
      variant='h5'
      className={styles.loaderText}
    >
      This may take a moment<span className={styles.dots}></span>
    </Typography>
  </Box>
);

export default Loader;
