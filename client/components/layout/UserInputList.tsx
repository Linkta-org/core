import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

interface UserInput {
  _id: string;
  input: string;
}

interface UserInputListProps {
  userInputList: UserInput[];
  visibleItems: number;
}

const UserInputList: React.FC<UserInputListProps> = ({
  userInputList,
  visibleItems,
}) => {
  return (
    <List>
      {userInputList.slice(0, visibleItems).map((input, index) => (
        <ListItem key={`${input._id}-${index}`}>
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
  );
};

export default UserInputList;
