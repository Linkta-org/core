import React, { useCallback, useEffect, useState } from 'react';
import { List, ListItemButton, ListItemText, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import OptionsMenu from './OptionsMenu';
import styles from '@styles/layout/UserInputList.module.css';
import useDrawerStore from '@stores/userDrawerStore';
import { useNavigate } from 'react-router-dom';
import useUpdateInputTitleMutation from '../../hooks/useUpdateInputTitleMutation';
import useDeleteInputMutation from '../../hooks/useDeleteInputMutation';
import type { UserInput } from '../../types';

interface UserInputListProps {
  inputHistory: UserInput[];
  visibleItems: number;
}
// TODO: event handlers for regenerate and delete to be implemented
const UserInputList: React.FC<UserInputListProps> = ({
  inputHistory,
  visibleItems,
}) => {
  const [menuAnchorElement, setMenuAnchorElement] =
    useState<null | HTMLElement>(null);
  const [selectedUserInputId, setSelectedUserInputId] = useState<string | null>(
    null,
  );
  const { drawerOpen } = useDrawerStore();
  const isMenuOpen = Boolean(menuAnchorElement) && drawerOpen;
  const updateInputTitleMutation = useUpdateInputTitleMutation();
  const deleteInputMutation = useDeleteInputMutation();
  const navigate = useNavigate();

  const handleItemClick = useCallback(
    (event: React.MouseEvent<HTMLElement>, id: string) => {
      setMenuAnchorElement(event.currentTarget);
      setSelectedUserInputId(id);
      const userInputId = id.split('-')[0];
      navigate(`/output/${userInputId}`);
    },
    [navigate],
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

  /**
   * Handles the rename action for a selected user input.
   */
  const handleRename = useCallback(() => {
    if (selectedUserInputId) {
      // Extract the actual userInputId
      const userInputId = selectedUserInputId.split('-')[0];
      const newTitle = prompt('Enter new title:', ''); //TODO: to remove after UI is implemented
      if (newTitle) {
        updateInputTitleMutation.mutate({ userInputId, newTitle });
      }
    }
  }, [selectedUserInputId, updateInputTitleMutation]);

  /**
   * Handles the delete action for a selected user input.
   */
  const handleDelete = useCallback(() => {
    if (selectedUserInputId) {
      // Extract the actual userInputId
      const userInputId = selectedUserInputId.split('-')[0];
      deleteInputMutation.mutate(userInputId);
    }
  }, [selectedUserInputId, deleteInputMutation]);

  return (
    <>
      <List
        className={styles.userInputList}
        role='list'
      >
        {inputHistory.slice(0, visibleItems).map((userInput, index) => {
          const uniqueId = `${userInput._id}-${index}`;
          return (
            <ListItemButton
              id={uniqueId}
              key={uniqueId}
              onClick={(event) => handleItemClick(event, uniqueId)}
              role='listitem'
              aria-labelledby={`user-input-${userInput._id}`}
              className={`${styles.userInputList__itemButton} ${
                selectedUserInputId === uniqueId
                  ? styles.userInputList__itemButtonSelected
                  : ''
              }`}
            >
              <ListItemText
                primary={
                  <Typography variant='caption'>{userInput.title}</Typography>
                }
                id={`user-input-${userInput._id}`}
                aria-label={`Details for ${userInput.title}`}
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
        onRename={handleRename}
        onRegenerate={() => {
          if (selectedUserInputId) {
            // console.log(
            //   'Regenerate Event Handler Placeholder:',
            //   selectedUserInputId
            // );
          }
          handleMenuClose();
        }}
        onDelete={handleDelete}
      />
    </>
  );
};

export default UserInputList;
