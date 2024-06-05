import React, { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
} from '@mui/material';
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
      sx={{ maxHeight: MAX_HEIGHT, overflow: 'auto' }}
    >
      <Typography
        variant="body2"
        color={'primary.contrastText'}
        gutterBottom
      >
        Recent
      </Typography>
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
      {visibleItems < userInputs.length && (
        <Button
          onClick={handleShowMore}
          variant="contained"
          sx={{ display: 'block', margin: '0 auto', mt: 2 }}
        >
          Show More
        </Button>
      )}
      {visibleItems > ITEMS_PER_PAGE && visibleItems >= userInputs.length && (
        <Button
          onClick={handleShowLess}
          variant="contained"
          sx={{ display: 'block', margin: '0 auto', mt: 2 }}
        >
          Show Less
        </Button>
      )}
    </Box>
  );
}
