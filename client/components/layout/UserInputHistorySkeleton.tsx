import React from 'react';
import { Box, Typography, Skeleton } from '@mui/material';
import styles from '@styles/layout/UserInputHistorySkeleton.module.css';

interface SkeletonListProps {
  length: number;
}

const UserInputHistorySkeleton: React.FC<SkeletonListProps> = ({ length }) => {
  const skeletonItems = Array.from({ length });

  return (
    <Box
      className={styles.skeletonList}
      role='list'
    >
      <Typography
        id='user-input-history-heading'
        variant='body2'
        gutterBottom
        className={styles.userInputHistory__heading}
      >
        Recent
      </Typography>
      <Box
        aria-labelledby='user-input-history-heading'
        role='region'
      >
        {skeletonItems.map((_, index) => (
          <Skeleton
            key={index}
            variant='rounded'
            aria-label='Loading content'
            animation='wave'
            className={styles.skeletonList__skeleton}
          />
        ))}
        <Skeleton
          variant='text'
          className={styles.paginationButton}
        />
      </Box>
    </Box>
  );
};

export default UserInputHistorySkeleton;
