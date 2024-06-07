import React from 'react';
import { Box, styled } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import PaginationButton from '@/client/components/common/PaginationButton';
import { ITEMS_PER_PAGE } from './userInputConstants';

interface PaginationControlsProps {
  handleShowMore: () => void;
  handleShowLess: () => void;
  visibleItems: number;
  totalItems: number;
}

const ControlsContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
});

const PaginationControls: React.FC<PaginationControlsProps> = ({
  handleShowMore,
  handleShowLess,
  visibleItems,
  totalItems,
}) => {
  return (
    <ControlsContainer
      role="group"
      aria-label="Pagination Controls"
    >
      {visibleItems < totalItems && (
        <PaginationButton
          onClick={handleShowMore}
          label="Show More"
          Icon={ExpandMore}
        />
      )}
      {visibleItems > ITEMS_PER_PAGE && (
        <PaginationButton
          onClick={handleShowLess}
          label="Show Less"
          Icon={ExpandLess}
        />
      )}
    </ControlsContainer>
  );
};

export default PaginationControls;
