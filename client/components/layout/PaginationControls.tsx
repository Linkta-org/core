import React from 'react';
import type { SxProps, Theme } from '@mui/material';
import { Box, styled } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import PaginationButton from '@/client/components/common/PaginationButton';
import { ITEMS_PER_PAGE } from './userInputConstants';

interface PaginationControlsProps {
  handleShowMore: () => void;
  handleShowLess: () => void;
  visibleItems: number;
  totalItems: number;
  loading: boolean;
  buttonSx?: SxProps<Theme>;
}

const ControlsContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '1rem',
});

const PaginationControls: React.FC<PaginationControlsProps> = ({
  handleShowMore,
  handleShowLess,
  visibleItems,
  totalItems,
  loading,
  buttonSx,
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
          disabled={loading}
          customSx={buttonSx}
        />
      )}
      {visibleItems > ITEMS_PER_PAGE && (
        <PaginationButton
          onClick={handleShowLess}
          label="Show Less"
          Icon={ExpandLess}
          disabled={loading}
          customSx={buttonSx}
        />
      )}
    </ControlsContainer>
  );
};

export default PaginationControls;
