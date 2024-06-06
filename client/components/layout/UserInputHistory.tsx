import React, { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
} from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { MOCK_USER_INPUT_LIST } from '@/mocks';

const MAX_HEIGHT = 1000;
const ITEMS_PER_PAGE = 10;

export default function UserInputHistory() {
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const userInputs = MOCK_USER_INPUT_LIST;

  const handleShowMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + ITEMS_PER_PAGE);
  };

  const handleShowLess = () => {
    setVisibleItems((prevVisibleItems) =>
      Math.max(prevVisibleItems - ITEMS_PER_PAGE, ITEMS_PER_PAGE)
    );
  };

  return (
    <Box
      className="recent-user-inputs"
      mt={5}
      pl={2}
    >
      <Typography
        variant="body2"
        color={'primary.contrastText'}
        gutterBottom
      >
        Recent
      </Typography>
      <Box
        className="scrollable-box"
        sx={{
          maxHeight: MAX_HEIGHT,
          overflow: 'auto',
        }}
      >
        <List>
          {userInputs.slice(0, visibleItems).map((input) => (
            <ListItem key={input._id}>
              <ListItemText
                primary={
                  <Typography
                    variant="caption"
                    noWrap
                    sx={{
                      display: 'inline-block',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '100%',
                    }}
                  >
                    {input.input}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        {visibleItems < userInputs.length && (
          <Button
            onClick={handleShowMore}
            variant="contained"
            sx={{
              width: '70%',
              fontSize: '0.7em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'transparent',
            }}
            startIcon={<ExpandMore />}
          >
            Show More
          </Button>
        )}
        {visibleItems > ITEMS_PER_PAGE && (
          <Button
            onClick={handleShowLess}
            variant="contained"
            sx={{
              width: '70%',
              fontSize: '0.7em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'transparent',
            }}
            startIcon={<ExpandLess />}
          >
            Show Less
          </Button>
        )}
      </Box>
    </Box>
  );
}
