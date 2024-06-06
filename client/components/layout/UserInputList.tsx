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
    <List role="list">
      {userInputList.slice(0, visibleItems).map((input, index) => (
        <ListItem
          key={`${input._id}-${index}`}
          role="listitem"
          aria-labelledby={`user-input-${input._id}`}
        >
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
                id={`user-input-${input._id}`}
                aria-label={input.input}
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
