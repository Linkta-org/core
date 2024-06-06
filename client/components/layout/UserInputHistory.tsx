import React, { useEffect, useState } from 'react';
import { Box, Typography, styled } from '@mui/material';
import UserInputList from './UserInputList';
import PaginationControls from './PaginationControls';
import useUserInputList from '@/client/hooks/useUserInputList';
import { ITEMS_PER_PAGE } from './userInputConstants';
import SkeletonList from '@/client/components/common/SkeletonList';

const UserInputHistoryContainer = styled(Box)({
  padding: 24,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  marginTop: 40,
  paddingLeft: 16,
});

const ScrollableBox = styled(Box)({
  flex: 1,
  overflowY: 'auto',
  overflowX: 'hidden',
  '::-webkit-scrollbar': {
    width: 8,
  },
  '::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(234, 231, 231, 0.432)',
    borderRadius: 4,
  },
});

const UserInputHistory = () => {
  const { userInputList, loading, handleShowMore, handleShowLess, page } =
    useUserInputList();
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    setVisibleItems(page * ITEMS_PER_PAGE);
  }, [page]);

  return (
    <UserInputHistoryContainer>
      <Typography
        id="user-input-history-heading"
        variant="body2"
        gutterBottom
      >
        Recent
      </Typography>
      <ScrollableBox
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
      </ScrollableBox>
      <PaginationControls
        handleShowMore={handleShowMore}
        handleShowLess={handleShowLess}
        visibleItems={visibleItems}
        totalItems={userInputList.length}
        loading={loading}
      />
    </UserInputHistoryContainer>
  );
};

export default UserInputHistory;
