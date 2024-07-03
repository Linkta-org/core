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
import { useCreateLinktaFlowMutation } from '../../hooks/useCreateLinktaFlowMutation';
import { extractUserInputId } from '../../utils/helpers';
import SnackBarNotification from '../common/SnackBarNotification';
import type LinktaFlow from '@/types/LinktaFlow';
import { useQueryClient } from '@tanstack/react-query';

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
  const [selectedUserInput, setSelectedUserInput] = useState<UserInput | null>(
    null,
  );
  const { drawerOpen } = useDrawerStore();
  const isMenuOpen = Boolean(menuAnchorElement) && drawerOpen;
  const updateInputTitleMutation = useUpdateInputTitleMutation();
  const deleteInputMutation = useDeleteInputMutation();
  const createLinktaFlowMutation = useCreateLinktaFlowMutation();
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'error' | 'warning' | 'info' | 'success',
  });
  const queryClient = useQueryClient();

  const handleItemClick = useCallback(
    (event: React.MouseEvent<HTMLElement>, userInput: UserInput) => {
      setMenuAnchorElement(event.currentTarget);
      setSelectedUserInput(userInput);
      const userInputId = extractUserInputId(userInput.id);
      navigate(`/output/${userInputId}`);
    },
    [navigate],
  );

  const handleMenuClose = useCallback(() => {
    setMenuAnchorElement(null);
    setSelectedUserInput(null);
  }, []);

  useEffect(() => {
    if (!drawerOpen) {
      setMenuAnchorElement(null);
      setSelectedUserInput(null);
    }
  }, [drawerOpen]);

  /**
   * Handles the rename action for a selected user input.
   */
  const handleRename = useCallback(() => {
    if (selectedUserInput) {
      const userInputId = extractUserInputId(selectedUserInput.id);
      const newTitle = prompt('Enter new title:', ''); //TODO: to remove after UI is implemented
      if (newTitle) {
        updateInputTitleMutation.mutate({ userInputId, newTitle });
      }
    }
  }, [selectedUserInput, updateInputTitleMutation]);

  /**
   * Handles the delete action for a selected user input.
   */
  const handleDelete = useCallback(() => {
    if (selectedUserInput) {
      const userInputId = extractUserInputId(selectedUserInput.id);
      deleteInputMutation.mutate(userInputId);
    }
  }, [selectedUserInput, deleteInputMutation]);

  /**
   * Handles the regenerate action of a new linktaflow with the selected user input.
   */
  const handleRegenerate = useCallback(async () => {
    if (selectedUserInput) {
      createLinktaFlowMutation.mutate(
        { input: selectedUserInput.input },
        {
          onSuccess: async (response: LinktaFlow) => {
            await queryClient.invalidateQueries({ queryKey: ['inputHistory'] });
            navigate(`/output/${response.userInputId}`);
            setSnackbar({
              open: true,
              message: 'LinktaFlow created successfully!',
              severity: 'success',
            });
          },
          onError: (error: Error) => {
            console.error('Error regenerating flow: ', error);
            setSnackbar({
              open: true,
              message: 'Failed to create LinktaFlow. Please try again.',
              severity: 'error',
            });
          },
        },
      );
    }
  }, [selectedUserInput, navigate, createLinktaFlowMutation, queryClient]);
  return (
    <>
      <List
        className={styles.userInputList}
        role='list'
      >
        {inputHistory.slice(0, visibleItems).map((userInput, index) => {
          const uniqueId = `${userInput.id}-${index}`;
          return (
            <ListItemButton
              id={uniqueId}
              key={uniqueId}
              onClick={(event) => handleItemClick(event, userInput)}
              role='listitem'
              aria-labelledby={`user-input-${userInput.id}`}
              className={`${styles.userInputList__itemButton} ${
                selectedUserInput?.id === userInput.id
                  ? styles.userInputList__itemButtonSelected
                  : ''
              }`}
            >
              <ListItemText
                primary={
                  <Typography variant='caption'>{userInput.title}</Typography>
                }
                id={`user-input-${userInput.id}`}
                aria-label={`Details for ${userInput.title}`}
                className={styles.userInputList__text}
              />
              <MoreVertIcon className={styles.userInputList__icon} />
            </ListItemButton>
          );
        })}
      </List>
      <OptionsMenu
        arialabelledby={`user-input-button-${selectedUserInput?.id}`}
        anchorEl={menuAnchorElement}
        isOpen={isMenuOpen}
        onClose={handleMenuClose}
        onRename={handleRename}
        onRegenerate={handleRegenerate}
        onDelete={handleDelete}
      />
      <SnackBarNotification
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        callerUpdater={() => setSnackbar({ ...snackbar, open: false })}
      />
    </>
  );
};

export default UserInputList;
