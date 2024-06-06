import React from 'react';
import { Box } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import PaginationButton from '@/client/components/common/PaginationButton';
import { ITEMS_PER_PAGE } from './userInputConstants';

interface PaginationControlsProps {
  handleShowMore: () => void;
  handleShowLess: () => void;
  visibleItems: number;
  totalItems: number;
  loading: boolean;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  handleShowMore,
  handleShowLess,
  visibleItems,
  totalItems,
  loading,
}) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
      {visibleItems < totalItems && (
        <PaginationButton
          onClick={handleShowMore}
          label="Show More"
          Icon={ExpandMore}
          disabled={loading}
        />
      )}
      {visibleItems > ITEMS_PER_PAGE && (
        <PaginationButton
          onClick={handleShowLess}
          label="Show Less"
          Icon={ExpandLess}
          disabled={loading}
        />
      )}
    </Box>
  );
};

export default PaginationControls;
