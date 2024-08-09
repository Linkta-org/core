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
import { useQueryClient } from '@tanstack/react-query';
import RenameDialog from './RenameDialog';
import DeleteDialog from './DeleteDialog';
import useLoadingStore from '@stores/LoadingStore';
import { useNotification } from '@hooks/useNotification';
import { AxiosError } from 'axios';

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
  const { setLoading } = useLoadingStore();
  const [renameAnchorElement, setRenameAnchorElement] =
    useState<null | HTMLElement>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { showNotification } = useNotification();

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
          await updateInputTitleMutation.mutateAsync({
            userInputId,
            newTitle,
          });
          await queryClient.invalidateQueries({ queryKey: ['inputHistory'] });

          showNotification(
            'Your LinktaFlow title has been updated successfully.',
            'success',
          );
        } catch (error) {
          console.error('Error renaming input: ', error);
          let errorMessage =
            'Unable to update LinktaFlow title. Please try again or check your connection.';

          if (error instanceof AxiosError && error.response) {
            errorMessage = error.response.data || errorMessage;
          } else if (error instanceof Error) {
            errorMessage = error.message;
          }

          showNotification(errorMessage, 'error', {
            duration: 6000,
          });
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
      setLoading(true);
      try {
        const response = await createLinktaFlowMutation.mutateAsync({
          input: selectedUserInput.input,
        });
        await queryClient.invalidateQueries({ queryKey: ['inputHistory'] });
        showNotification('LinktaFlow generated successfully', 'success');
        navigate(`/output/${response.userInputId}`);
        setLoading(false);
      } catch (error) {
        console.error('Error regenerating LinktaFlow: ', error);
        let errorMessage = 'Failed to regenerate LinktaFlow. Please try again.';

        if (error instanceof AxiosError && error.response) {
          errorMessage = error.response.data || errorMessage;
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }

        showNotification(errorMessage, 'error', {
          duration: 6000,
        });

        setLoading(false);
      }
    }
  }, [
    selectedUserInput,
    navigate,
    createLinktaFlowMutation,
    queryClient,
    setLoading,
  ]);

  const handleDelete = useCallback(() => {
    setDeleteDialogOpen(true);
  }, []);

  const handleDeleteConfirm = useCallback(async () => {
    if (selectedUserInput) {
      const userInputId = extractUserInputId(selectedUserInput.id);
      try {
        await deleteInputMutation.mutateAsync(userInputId);
        await queryClient.invalidateQueries({ queryKey: ['inputHistory'] });
        showNotification(
          'Your LinktaFlow and associated input have been deleted successfully.',
          'success',
        );
        navigate('/generate');
      } catch (error) {
        console.error('Error deleting input: ', error);
        let errorMessage =
          "We couldn't delete the LinktaFlow. Please try again or refresh the page.";

        if (error instanceof AxiosError && error.response) {
          errorMessage = error.response.data || errorMessage;
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }

        showNotification(errorMessage, 'error', {
          duration: 6000,
        });
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
    </>
  );
};

export default UserInputList;
