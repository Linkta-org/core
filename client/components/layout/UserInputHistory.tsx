import React from 'react';
import { Box, Typography } from '@mui/material';
import UserInputList from './UserInputList';
import PaginationControls from './PaginationControls';
import { ITEMS_PER_PAGE } from '@utils/constants';
import styles from '@styles/layout/UserInputHistory.module.css';
import UserInputHistorySkeleton from './UserInputHistorySkeleton';
import useInputHistory from '@hooks/useInputHistory';

const UserInputHistory: React.FC = () => {
  const {
    inputHistory,
    loading,
    handleShowMore,
    handleShowLess,
    hasNextPage,
    isFetchingNextPage,
  } = useInputHistory();
  const visibleItems = inputHistory.length;

  return (
    <Box className={styles.userInputHistory}>
      {loading && !isFetchingNextPage ? (
        <UserInputHistorySkeleton length={ITEMS_PER_PAGE} />
      ) : (
        <>
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
            className={styles.userInputHistory__scrollable}
          >
            <UserInputList
              inputHistory={inputHistory}
              visibleItems={visibleItems}
            />
            <PaginationControls
              handleShowMore={handleShowMore}
              handleShowLess={handleShowLess}
              visibleItems={visibleItems}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default UserInputHistory;
