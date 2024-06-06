import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import UserInputList from './UserInputList';
import PaginationControls from './PaginationControls';
import useUserInputList from '@/client/hooks/useUserInputList';
import { ITEMS_PER_PAGE } from './userInputConstants';

const MAX_HEIGHT = 1000; // TODO: Temp solution

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
    >
      <Typography
        variant="body2"
        color={'primary.contrastText'}
        gutterBottom
      >
        Recent
      </Typography>
      <Box
        className="scrollable-box"
        sx={{
          maxHeight: MAX_HEIGHT,
          overflow: 'auto',
        }}
      >
        <UserInputList
          userInputList={userInputList}
          visibleItems={visibleItems}
        />
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
