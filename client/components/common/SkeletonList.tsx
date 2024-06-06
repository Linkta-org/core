import React from 'react';
import { List, ListItem, Skeleton, styled } from '@mui/material';

interface SkeletonListProps {
  length: number;
}

const StyledSkeleton = styled(Skeleton)({
  width: '100%',
});

const SkeletonList: React.FC<SkeletonListProps> = ({ length }) => {
  const skeletonItems = Array.from({ length });

  return (
    <List role="list">
      {skeletonItems.map((_, index) => (
        <ListItem
          key={index}
          role="listitem"
        >
          <StyledSkeleton
            variant="text"
            aria-label="Loading content"
          />
        </ListItem>
      ))}
    </List>
  );
};

export default SkeletonList;
