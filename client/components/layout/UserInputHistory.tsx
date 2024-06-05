import React from 'react';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import { MOCK_USER_INPUT_LIST } from '@/mocks';

export default function UserInputHistory() {
  const userInputs = MOCK_USER_INPUT_LIST;

  return (
    <Box
      className="recent-user-inputs"
      mt={5}
      pl={2}
    >
      <Typography
        variant="body2"
        color={'primary.contrastText'}
      >
        Recent
      </Typography>
      <List>
        {userInputs.map((input) => (
          <ListItem key={input._id}>
            <ListItemText primary={input.input} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
