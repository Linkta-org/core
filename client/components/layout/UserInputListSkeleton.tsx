import React from 'react';
import { Box, List, ListItem, Typography, Skeleton } from '@mui/material';
import { ITEMS_PER_PAGE } from './userInputConstants';

const UserInputListSkeleton = () => {
  const skeletonItems = Array.from({ length: ITEMS_PER_PAGE });

  return (
    <Box
      mt={5}
      pl={2}
    >
      <Typography
        id="user-input-skeleton-heading"
        variant="body2"
        color="primary.contrastText"
        gutterBottom
      >
        Recent
      </Typography>
      <Box
        className="scrollable-box"
        sx={{ maxHeight: 1000, overflow: 'auto' }}
        aria-labelledby="user-input-skeleton-heading"
        role="region"
      >
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
      </Box>
    </Box>
  );
};

export default UserInputListSkeleton;
