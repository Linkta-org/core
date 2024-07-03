import React, { useCallback, useEffect, useState } from 'react';
import { List, ListItemButton, ListItemText, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import OptionsMenu from './OptionsMenu';
import styles from '@styles/layout/UserInputList.module.css';
import useDrawerStore from '@stores/userDrawerStore';
import { useNavigate } from 'react-router-dom';
import useUpdateInputTitleMutation from '@hooks/useUpdateInputTitleMutation';
import useDeleteInputMutation from '@hooks/useDeleteInputMutation';
import type { UserInput } from '../../types';
import RenameDialog from './RenameDialog';
import { extractUserInputId } from '@utils/helpers';

interface UserInputListProps {
  inputHistory: UserInput[];
  visibleItems: number;
}

const UserInputList: React.FC<UserInputListProps> = ({
  inputHistory,
  visibleItems,
}) => {
  const [menuAnchorElement, setMenuAnchorElement] =
    useState<null | HTMLElement>(null);
  const [renameAnchorElement, setRenameAnchorElement] =
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
      const userInputId = extractUserInputId(id);
      navigate(`/output/${userInputId}`);
    },
    [navigate],
  );

  const handleMenuClose = useCallback(() => {
    setMenuAnchorElement(null);
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
      setRenameAnchorElement(menuAnchorElement);
    }
  }, [selectedUserInputId, menuAnchorElement]);

  const handleRenameSave = useCallback(
    (newTitle: string) => {
      if (selectedUserInputId) {
        const userInputId = extractUserInputId(selectedUserInputId);
        updateInputTitleMutation.mutate(
          { userInputId, newTitle },
          {
            onSuccess: () => console.log('Mutation succeeded'),
            onError: (error: Error) => console.error('Mutation failed:', error),
          },
        );
        setRenameAnchorElement(null);
      }
    },
    [selectedUserInputId, updateInputTitleMutation],
  );

  const handleRenameCancel = useCallback(() => {
    setRenameAnchorElement(null);
  }, []);

  /**
   * Handles the delete action for a selected user input.
   */
  const handleDelete = useCallback(() => {
    if (selectedUserInputId) {
      const userInputId = extractUserInputId(selectedUserInputId);
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
      <RenameDialog
        isOpen={Boolean(renameAnchorElement)}
        currentTitle={
          inputHistory.find(
            (input) =>
              input._id === extractUserInputId(selectedUserInputId || ''),
          )?.title || ''
        }
        onSave={handleRenameSave}
        onCancel={handleRenameCancel}
      />
    </>
  );
};

export default UserInputList;
