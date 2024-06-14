import React, { useEffect, useState } from 'react';
import { Box, Typography, styled } from '@mui/material';
import UserInputList from './UserInputList';
import PaginationControls from './PaginationControls';
import useUserInputList from '@hooks/useUserInputList';
import { ITEMS_PER_PAGE } from './userInputConstants';
import SkeletonList from '@components/common/SkeletonList';

const UserInputHistoryContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  boxSizing: 'border-box',
  marginTop: '2.5rem',
  overflow: 'hidden',
});

const ScrollableBox = styled(Box)({
  flex: 1,
  overflowY: 'auto',
  overflowX: 'hidden',
  '::-webkit-scrollbar': {
    width: '0.5rem',
  },
  '::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(234, 231, 231, 0.5)',
    borderRadius: '0.25rem',
  },
});

const StyledTypography = styled(Typography)({
  paddingLeft: '1rem',
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
      <StyledTypography
        id="user-input-history-heading"
        variant="body2"
        gutterBottom
      >
        Recent
      </StyledTypography>
      <ScrollableBox
        aria-labelledby="user-input-history-heading"
        role="region"
      >
        {loading ? (
          <SkeletonList length={ITEMS_PER_PAGE} />
        ) : (
          <>
            <UserInputList
              userInputList={userInputList}
              visibleItems={visibleItems}
            />
            <PaginationControls
              handleShowMore={handleShowMore}
              handleShowLess={handleShowLess}
              visibleItems={visibleItems}
              totalItems={userInputList.length}
            />
          </>
        )}
      </ScrollableBox>
    </UserInputHistoryContainer>
  );
};

export default UserInputHistory;
