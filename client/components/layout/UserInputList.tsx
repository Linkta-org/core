import React, { useCallback, useEffect, useState } from 'react';
import { List, ListItemButton, ListItemText, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import OptionsMenu from './OptionsMenu';
import styles from '@styles/layout/UserInputList.module.css';
import useSideNavDrawerStore from '@stores/SideNavDrawerStore';
import { useNavigate } from 'react-router-dom';
import useUpdateInputTitleMutation from '@hooks/useUpdateInputTitleMutation';
import useDeleteInputMutation from '@hooks/useDeleteInputMutation';
import type { UserInput } from '@/types/UserInput';
import { useCreateLinktaFlowMutation } from '@hooks/useCreateLinktaFlowMutation';
import { extractUserInputId } from '@utils/helpers';
import SnackBarNotification from '@components/common/SnackBarNotification';
import type { SnackbarSeverity } from '@/types/snackBar';
import { useQueryClient } from '@tanstack/react-query';
import RenameDialog from './RenameDialog';
import DeleteDialog from './DeleteDialog';

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
  const { drawerOpen } = useSideNavDrawerStore();
  const isMenuOpen = Boolean(menuAnchorElement) && drawerOpen;
  const updateInputTitleMutation = useUpdateInputTitleMutation();
  const deleteInputMutation = useDeleteInputMutation();
  const createLinktaFlowMutation = useCreateLinktaFlowMutation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [renameAnchorElement, setRenameAnchorElement] =
    useState<null | HTMLElement>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] =
    useState<SnackbarSeverity>('success');

  const resetSnackbarStates = () => {
    setIsSnackbarOpen(false);
    setSnackbarMessage('');
    setSnackbarSeverity('success');
  };

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
    async (newTitle: string) => {
      if (selectedUserInput) {
        const userInputId = extractUserInputId(selectedUserInput.id);
        try {
          const data = await updateInputTitleMutation.mutateAsync({
            userInputId,
            newTitle,
          });
          await queryClient.invalidateQueries({ queryKey: ['inputHistory'] });
          setIsSnackbarOpen(true);
          setSnackbarMessage(`${data.message}`);
        } catch (error) {
          console.error('Error updating input title: ', error);
          setIsSnackbarOpen(true);
          setSnackbarMessage('Failed to update input title. Please try again.');
          setSnackbarSeverity('error');
        }
        setRenameAnchorElement(null);
      }
    },
    [selectedUserInput, updateInputTitleMutation, queryClient],
  );

  const handleRenameCancel = useCallback(() => {
    setRenameAnchorElement(null);
  }, []);

  const handleRegenerate = useCallback(async () => {
    if (selectedUserInput) {
      try {
        const response = await createLinktaFlowMutation.mutateAsync({
          input: selectedUserInput.input,
        });
        await queryClient.invalidateQueries({ queryKey: ['inputHistory'] });
        navigate(`/output/${response.userInputId}`);
      } catch (error) {
        console.error('Error regenerating flow: ', error);
        setIsSnackbarOpen(true);
        setSnackbarMessage('Failed to create LinktaFlow. Please try again.');
        setSnackbarSeverity('error');
      }
    }
  }, [selectedUserInput, navigate, createLinktaFlowMutation, queryClient]);

  const handleDelete = useCallback(() => {
    setDeleteDialogOpen(true);
  }, []);

  const handleDeleteConfirm = useCallback(async () => {
    if (selectedUserInput) {
      const userInputId = extractUserInputId(selectedUserInput.id);
      try {
        await deleteInputMutation.mutateAsync(userInputId);
        await queryClient.invalidateQueries({ queryKey: ['inputHistory'] });
        navigate('/generate');
      } catch (error) {
        console.error('Error deleting input: ', error);
        setIsSnackbarOpen(true);
        setSnackbarMessage('Failed to delete input. Please try again.');
        setSnackbarSeverity('error');
      }
      setDeleteDialogOpen(false);
      setSelectedUserInput(null);
    }
  }, [selectedUserInput, deleteInputMutation, queryClient, navigate]);

  const handleDeleteCancel = useCallback(() => {
    setDeleteDialogOpen(false);
  }, []);

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
      <DeleteDialog
        isOpen={deleteDialogOpen}
        onDelete={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
      <SnackBarNotification
        open={isSnackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        callerUpdater={resetSnackbarStates}
      />
    </>
  );
};

export default UserInputList;
