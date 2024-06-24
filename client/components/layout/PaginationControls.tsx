import React from 'react';
import { Box } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import PaginationButton from '@components/layout/PaginationButton';
import styles from '@styles/layout/PaginationControls.module.css';
import { ITEMS_PER_PAGE } from '@utils/constants';

interface PaginationControlsProps {
  handleShowMore: () => void;
  handleShowLess: () => void;
  visibleItems: number;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  handleShowMore,
  handleShowLess,
  visibleItems,
  hasNextPage,
  isFetchingNextPage,
}) => {
  return (
    <Box
      role='group'
      aria-label='Pagination Controls'
      className={styles.paginationControls}
    >
      {hasNextPage && (
        <PaginationButton
          onClick={handleShowMore}
          label={isFetchingNextPage ? 'Loading more...' : 'Show More'}
          Icon={ExpandMore}
        />
      )}
      {visibleItems > ITEMS_PER_PAGE && (
        <PaginationButton
          onClick={handleShowLess}
          label='Show Less'
          Icon={ExpandLess}
        />
      )}
    </Box>
  );
};

export default PaginationControls;
