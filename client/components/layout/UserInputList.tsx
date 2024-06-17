import React, { useCallback, useEffect, useState } from 'react';
import { List, ListItemButton, ListItemText, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import OptionsMenu from './OptionsMenu';
import styles from '@client/styles/layout/UserInputList.module.css';
import useDrawerStore from '@/client/stores/userDrawerStore';

interface UserInput {
  _id: string;
  input: string;
}

interface UserInputListProps {
  inputHistory: UserInput[];
  visibleItems: number;
}
// TODO: event handlers for rename, regenerate, and delete to be implemented
const UserInputList: React.FC<UserInputListProps> = ({
  inputHistory,
  visibleItems,
}) => {
  const [menuAnchorElement, setMenuAnchorElement] =
    useState<null | HTMLElement>(null);
  const [selectedUserInputId, setSelectedUserInputId] = useState<string | null>(
    null
  );
  const { drawerOpen } = useDrawerStore();
  const isMenuOpen = Boolean(menuAnchorElement) && drawerOpen;

  const handleItemClick = useCallback(
    (event: React.MouseEvent<HTMLElement>, id: string) => {
      setMenuAnchorElement(event.currentTarget);
      setSelectedUserInputId(id);
    },
    []
  );

  const handleMenuClose = useCallback(() => {
    setMenuAnchorElement(null);
    setSelectedUserInputId(null);
  }, []);

  useEffect(() => {
    if (!drawerOpen) {
      setMenuAnchorElement(null);
      setSelectedUserInputId(null);
    }
  }, [drawerOpen]);

  return (
    <>
      <List
        className={styles.userInputList}
        role="list"
      >
        {inputHistory.slice(0, visibleItems).map((userInput, index) => {
          const uniqueId = `${userInput._id}-${index}`;
          return (
            <ListItemButton
              id={uniqueId}
              key={uniqueId}
              onClick={(event) => handleItemClick(event, uniqueId)}
              role="listitem"
              aria-labelledby={`user-input-${userInput._id}`}
              className={`${styles.userInputList__itemButton} ${
                selectedUserInputId === uniqueId
                  ? styles.userInputList__itemButtonSelected
                  : ''
              }`}
            >
              <ListItemText
                primary={
                  <Typography variant="caption">{userInput.input}</Typography>
                }
                id={`user-input-${userInput._id}`}
                aria-label={`Details for ${userInput.input}`}
                className={styles.userInputList__text}
              />
              <MoreVertIcon className={styles.userInputList__icon} />
            </ListItemButton>
          );
        })}
      </List>
      <OptionsMenu
        arialabelledby={`user-input-button-${selectedUserInputId}`}
        anchorEl={menuAnchorElement}
        isOpen={isMenuOpen}
        onClose={handleMenuClose}
        onRename={() => {
          if (selectedUserInputId) {
            console.log(
              'Rename Event Handler Placeholder:',
              selectedUserInputId
            );
          }
          handleMenuClose();
        }}
        onRegenerate={() => {
          if (selectedUserInputId) {
            console.log(
              'Regenerate Event Handler Placeholder:',
              selectedUserInputId
            );
          }
          handleMenuClose();
        }}
        onDelete={() => {
          if (selectedUserInputId) {
            console.log(
              'Delete Event Handler Placeholder:',
              selectedUserInputId
            );
          }
          handleMenuClose();
        }}
      />
    </>
  );
};

export default React.memo(UserInputList);
