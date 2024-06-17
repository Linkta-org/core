import React from 'react';
import { Box, Typography } from '@mui/material';
import UserInputList from './UserInputList';
import PaginationControls from './PaginationControls';
import { ITEMS_PER_PAGE } from './userInputConstants';
import styles from '@client/styles/layout/UserInputHistory.module.css';
import SkeletonList from './SkeletonList';
import useInputHistory from '@hooks/useInputHistory';

const UserInputHistory: React.FC = () => {
  const { inputHistory, loading, handleShowMore, handleShowLess, page } =
    useInputHistory();
  const visibleItems = page * ITEMS_PER_PAGE;

  return (
    <Box className={styles.userInputHistory}>
      <Typography
        id="user-input-history-heading"
        variant="body2"
        gutterBottom
        className={styles.userInputHistory__heading}
      >
        Recent
      </Typography>
      <Box
        aria-labelledby="user-input-history-heading"
        role="region"
        className={styles.userInputHistory__scrollable}
      >
        {loading ? (
          <SkeletonList length={ITEMS_PER_PAGE} />
        ) : (
          <>
            <UserInputList
              inputHistory={inputHistory}
              visibleItems={visibleItems}
            />
            <PaginationControls
              handleShowMore={handleShowMore}
              handleShowLess={handleShowLess}
              visibleItems={visibleItems}
              totalItems={inputHistory.length}
            />
          </>
        )}
      </Box>
    </Box>
  );
};

export default UserInputHistory;
