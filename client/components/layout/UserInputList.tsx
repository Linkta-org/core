import React from 'react';
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  styled,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

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
  paddingLeft: 0,
  padding: '0.25rem 0',
  minHeight: '2rem',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
});

const StyledTypography = styled(Typography)({
  display: 'inline-block',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '100%',
  paddingLeft: '1rem',
});

const StyledIconButton = styled(IconButton)({
  color: 'rgba(234, 231, 231, 0.5)',
  transform: 'scale(0.7)',
  marginLeft: '0.25em',
});

const UserInputList: React.FC<UserInputListProps> = ({
  userInputList,
  visibleItems,
}) => {
  const handleItemClick = (id: string) => {
    console.log(`Clicked on icon for item with id: ${id}`); // TODO: Implement more logic
  };

  return (
    <StyledList role="list">
      {userInputList.slice(0, visibleItems).map((input, index) => (
        <StyledListItem
          key={`${input._id}-${index}`}
          role="listitem"
          aria-labelledby={`user-input-${input._id}`}
          onClick={() => handleItemClick(input._id)}
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
          <StyledIconButton>
            <MoreVertIcon />
          </StyledIconButton>
        </StyledListItem>
      ))}
    </StyledList>
  );
};

export default UserInputList;
