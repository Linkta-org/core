import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  styled,
} from '@mui/material';

interface UserInput {
  _id: string;
  input: string;
}

interface UserInputListProps {
  userInputList: UserInput[];
  visibleItems: number;
}

const StyledList = styled(List)({
  width: '100%',
});

const StyledListItem = styled(ListItem)({
  padding: 0,
});

const StyledTypography = styled(Typography)({
  display: 'inline-block',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '100%',
});

const UserInputList: React.FC<UserInputListProps> = ({
  userInputList,
  visibleItems,
}) => {
  return (
    <StyledList role="list">
      {userInputList.slice(0, visibleItems).map((input, index) => (
        <StyledListItem
          key={`${input._id}-${index}`}
          role="listitem"
          aria-labelledby={`user-input-${input._id}`}
        >
          <ListItemText
            primary={
              <StyledTypography
                variant="caption"
                noWrap
                id={`user-input-${input._id}`}
                aria-label={input.input}
              >
                {input.input}
              </StyledTypography>
            }
          />
        </StyledListItem>
      ))}
    </StyledList>
  );
};

export default UserInputList;
