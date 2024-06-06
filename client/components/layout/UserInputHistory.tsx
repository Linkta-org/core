import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import UserInputList from './UserInputList';
import PaginationControls from './PaginationControls';
import useUserInputList from '@/client/hooks/useUserInputList';
import { ITEMS_PER_PAGE } from './userInputConstants';
import SkeletonList from '@/client/components/common/SkeletonList';

const UserInputHistory = () => {
  const { userInputList, loading, handleShowMore, handleShowLess, page } =
    useUserInputList();
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    setVisibleItems(page * ITEMS_PER_PAGE);
  }, [page]);

  return (
    <Box
      className="recent-user-inputs"
      mt={5}
      pl={2}
      sx={{
        padding: 3,
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Typography
        id="user-input-history-heading"
        variant="body2"
        color={'primary.contrastText'}
        gutterBottom
      >
        Recent
      </Typography>
      <Box
        className="scrollable-box"
        sx={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
        aria-labelledby="user-input-history-heading"
        role="region"
      >
        {loading ? (
          <SkeletonList length={ITEMS_PER_PAGE} />
        ) : (
          <UserInputList
            userInputList={userInputList}
            visibleItems={visibleItems}
          />
        )}
      </Box>
      <PaginationControls
        handleShowMore={handleShowMore}
        handleShowLess={handleShowLess}
        visibleItems={visibleItems}
        totalItems={userInputList.length}
        loading={loading}
      />
    </Box>
  );
};

export default UserInputHistory;
