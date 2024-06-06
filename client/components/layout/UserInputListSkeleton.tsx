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
        variant="body2"
        color="primary.contrastText"
        gutterBottom
      >
        Recent
      </Typography>
      <Box
        className="scrollable-box"
        sx={{ maxHeight: 1000, overflow: 'auto' }}
      >
        <List>
          {skeletonItems.map((_, index) => (
            <ListItem key={index}>
              <Skeleton
                variant="text"
                width="100%"
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default UserInputListSkeleton;
