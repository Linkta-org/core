import React, { useCallback, useEffect, useState } from 'react';
import { List, ListItemButton, ListItemText, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import OptionsMenu from './OptionsMenu';
import styles from '@styles/layout/UserInputList.module.css';
import useDrawerStore from '@stores/userDrawerStore';
import { useNavigate } from 'react-router-dom';
import useUpdateInputTitleMutation from '@hooks/useUpdateInputTitleMutation';
import useDeleteInputMutation from '@hooks/useDeleteInputMutation';
import type { UserInput } from '@/types/UserInput';
import { useCreateLinktaFlowMutation } from '@hooks/useCreateLinktaFlowMutation';
import { extractUserInputId } from '@utils/helpers';
import SnackBarNotification from '../common/SnackBarNotification';
import type LinktaFlow from '@/types/LinktaFlow';
import { useQueryClient } from '@tanstack/react-query';
import RenameDialog from './RenameDialog';
import type { UpdateInputTitleResponse } from '@/types/UserInput';

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
  const [renameAnchorElement, setRenameAnchorElement] =
    useState<null | HTMLElement>(null);

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
  }, []);

  useEffect(() => {
    if (!drawerOpen) {
      setMenuAnchorElement(null);
      setSelectedUserInput(null);
    }
  }, [drawerOpen]);

  const handleRename = useCallback(() => {
    if (selectedUserInput) {
      setRenameAnchorElement(menuAnchorElement);
    }
  }, [selectedUserInput, menuAnchorElement]);

  const handleRenameSave = useCallback(
    (newTitle: string) => {
      if (selectedUserInput) {
        const userInputId = extractUserInputId(selectedUserInput.id);
        updateInputTitleMutation.mutate(
          { userInputId, newTitle },
          {
            onSuccess: async (data: UpdateInputTitleResponse) => {
              await queryClient.invalidateQueries({
                queryKey: ['inputHistory'],
              });
              setSnackbar({
                open: true,
                message: data.message,
                severity: 'success',
              });
            },
            onError: (error: Error) => {
              console.error('Error updating input title: ', error);
              setSnackbar({
                open: true,
                message: 'Failed to update input title. Please try again.',
                severity: 'error',
              });
            },
          },
        );
        setRenameAnchorElement(null);
      }
    },
    [selectedUserInput, updateInputTitleMutation],
  );

  const handleRenameCancel = useCallback(() => {
    setRenameAnchorElement(null);
  }, []);

  const handleDelete = useCallback(() => {
    if (selectedUserInput) {
      const userInputId = extractUserInputId(selectedUserInput.id);
      deleteInputMutation.mutate(userInputId);
    }
  }, [selectedUserInput, deleteInputMutation]);

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
      <RenameDialog
        isOpen={Boolean(renameAnchorElement)}
        currentTitle={
          inputHistory.find(
            (input) =>
              input.id === extractUserInputId(selectedUserInput?.id || ''),
          )?.title || ''
        }
        onSave={handleRenameSave}
        onCancel={handleRenameCancel}
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
