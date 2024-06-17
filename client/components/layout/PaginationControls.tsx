import React from 'react';
import { Box } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import PaginationButton from '@components/layout/PaginationButton';
import { ITEMS_PER_PAGE } from './userInputConstants';
import styles from '@client/styles/layout/PaginationControls.module.css';

interface PaginationControlsProps {
  handleShowMore: () => void;
  handleShowLess: () => void;
  visibleItems: number;
  totalItems: number;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  handleShowMore,
  handleShowLess,
  visibleItems,
  totalItems,
}) => {
  return (
    <Box
      role="group"
      aria-label="Pagination Controls"
      className={styles.paginationControls}
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
    </Box>
  );
};

export default PaginationControls;
