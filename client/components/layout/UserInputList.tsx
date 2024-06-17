import React, { useState } from 'react';
import {
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  styled,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ListItemMenu from './ListItemMenu';

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

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  padding: '0.2rem 1rem',
  minHeight: '2rem',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  '&:hover, &:focus-within': {
    backgroundColor: theme.palette.action.hover,
    '& .MuiIconButton-root': {
      visibility: 'visible',
    },
  },
  '&.Mui-selected, &.Mui-selected:hover, &.Mui-selected:focus-within': {
    backgroundColor: theme.palette.action.selected,
    '& .MuiIconButton-root': {
      visibility: 'visible',
    },
  },
}));

const StyledTypography = styled(Typography)({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '100%',
  paddingLeft: '1rem',
  whiteSpace: 'nowrap',
});

const StyledIconButton = styled(IconButton)({
  color: 'rgba(234, 231, 231, 0.5)',
  transform: 'scale(0.7)',
  margin: '0 0.25em',
  visibility: 'hidden',
});

const UserInputList: React.FC<UserInputListProps> = ({
  userInputList,
  visibleItems,
}) => {
  const [menuAnchorElement, setMenuAnchorElement] =
    useState<null | HTMLElement>(null);
  const [selectedUserInputId, setSelectedUserInputId] = useState<string | null>(
    null
  );

  const handleItemClick = (
    event: React.MouseEvent<HTMLElement>,
    id: string
  ) => {
    if (selectedUserInputId === id && menuAnchorElement) {
      handleMenuClose();
    } else {
      setMenuAnchorElement(event.currentTarget as HTMLElement);
      setSelectedUserInputId(id);
    }
  };

  const handleMenuClose = () => {
    setMenuAnchorElement(null);
    setSelectedUserInputId(null);
  };

  return (
    <StyledList role="list">
      {userInputList.slice(0, visibleItems).map((userInput) => (
        <StyledListItemButton
          key={userInput._id}
          onClick={(event) => handleItemClick(event, userInput._id)}
          role="listitem"
          aria-labelledby={`user-input-${userInput._id}`}
          selected={selectedUserInputId === userInput._id}
        >
          <ListItemText
            primary={
              <StyledTypography
                variant="caption"
                noWrap
                id={`user-input-${userInput._id}`}
                aria-label={`Details for ${userInput.input}`}
              >
                {userInput.input}
              </StyledTypography>
            }
          />
          <StyledIconButton
            aria-label="More options"
            aria-haspopup="true"
            onClick={(event) => {
              event.stopPropagation();
              handleItemClick(event, userInput._id);
            }}
          >
            <MoreVertIcon />
          </StyledIconButton>
          <ListItemMenu
            anchorEl={menuAnchorElement}
            isOpen={
              Boolean(menuAnchorElement) &&
              selectedUserInputId === userInput._id
            }
            onClose={handleMenuClose}
            onRename={() => {
              // console.log('Rename:', userInput._id)
            }}
            onRegenerate={() => {
              // console.log('Regenerate:', userInput._id)
            }}
            onDelete={() => {
              // console.log('Delete:', userInput._id)
            }}
          />
        </StyledListItemButton>
      ))}
    </StyledList>
  );
};

export default UserInputList;
