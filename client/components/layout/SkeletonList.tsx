import React from 'react';
import { List, ListItem, Skeleton } from '@mui/material';
import styles from '@styles/layout/SkeletonList.module.css';

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
            aria-label="Loading content"
            className={styles.skeletonList__skeleton}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default SkeletonList;
