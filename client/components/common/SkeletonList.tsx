import React from 'react';
import { List, ListItem, Skeleton } from '@mui/material';

interface SkeletonListProps {
  length: number;
}

const SkeletonList: React.FC<SkeletonListProps> = ({ length }) => {
  const skeletonItems = Array.from({ length });

  return (
    <List role="list">
      {skeletonItems.map((_, index) => (
        <ListItem
          key={index}
          role="listitem"
        >
          <Skeleton
            variant="text"
            width="100%"
            aria-label="Loading content"
          />
        </ListItem>
      ))}
    </List>
  );
};

export default SkeletonList;
