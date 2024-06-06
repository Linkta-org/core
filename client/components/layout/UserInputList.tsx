import React from 'react';
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  styled,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

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
  textOverflow: 'clip',
  maxWidth: '100%',
});

const StyledIconButton = styled(IconButton)({
  color: 'inherit',
  transform: 'scale(0.6)',
});

const UserInputList: React.FC<UserInputListProps> = ({
  userInputList,
  visibleItems,
}) => {
  const handleIconClick = (id: string) => {
    console.log(`Clicked on icon for item with id: ${id}`); // TODO: Implement more logic
  };

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
          <StyledIconButton
            aria-label={`More options for ${input.input}`}
            onClick={() => handleIconClick(input._id)}
          >
            <MoreHorizIcon />
          </StyledIconButton>
        </StyledListItem>
      ))}
    </StyledList>
  );
};

export default UserInputList;
