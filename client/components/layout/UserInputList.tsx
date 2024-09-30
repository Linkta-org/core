import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  List,
  ListItemButton,
  ListItemText,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import OptionsMenu from './OptionsMenu';
import RenameDialog from './RenameDialog';
import DeleteDialog from './DeleteDialog';
import useSideNavDrawerStore from '@stores/SideNavDrawerStore';
import useUpdateInputTitleMutation from '@hooks/useUpdateInputTitleMutation';
import useDeleteInputMutation from '@hooks/useDeleteInputMutation';
import { useCreateLinktaFlowMutation } from '@hooks/useCreateLinktaFlowMutation';
import useLoadingStore from '@stores/LoadingStore';
import { useNotification } from '@hooks/useNotification';
import { useQueryClient } from '@tanstack/react-query';
import type { UserInput } from '@/types/UserInput';
import { handleError } from '@/utils/errorHandler';
import styles from '@styles/layout/UserInputList.module.css';

interface UserInputListProps {
  inputHistory: UserInput[];
  visibleItems: number;
}

const UserInputList: React.FC<UserInputListProps> = ({
  inputHistory,
  visibleItems,
}) => {
  const [optionsMenuAnchor, setOptionsMenuAnchor] =
    useState<null | HTMLElement>(null);
  const [activeUserInput, setActiveUserInput] = useState<UserInput | null>(
    null,
  );
  const [isRenamingDialogOpen, setIsRenamingDialogOpen] = useState(false);
  const [isDeletionDialogOpen, setIsDeletionDialogOpen] = useState(false);

  const { drawerOpen } = useSideNavDrawerStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const updateTitleMutation = useUpdateInputTitleMutation();
  const deleteInputMutation = useDeleteInputMutation();
  const regenerateLinktaFlowMutation = useCreateLinktaFlowMutation();
  const { setLoading } = useLoadingStore();
  const { showNotification } = useNotification();
  const isOptionsMenuOpen = Boolean(optionsMenuAnchor);

  // Close options menu when side drawer closes
  if (!drawerOpen && optionsMenuAnchor) {
    setOptionsMenuAnchor(null);
  }

  const handleUserInputSelect = (selectedInput: UserInput) => {
    setActiveUserInput(selectedInput);
    navigate(`/output/${selectedInput.id}`);
  };

  const handleOptionsIconClick = (event: React.MouseEvent<HTMLElement>) => {
    setOptionsMenuAnchor(event.currentTarget);
  };

  const handleTitleUpdate = useCallback(
    async (newTitle: string) => {
      if (activeUserInput) {
        const userInputId = activeUserInput.id;
        try {
          await updateTitleMutation.mutateAsync({ userInputId, newTitle });
          await queryClient.invalidateQueries({ queryKey: ['inputHistory'] });
          showNotification(
            'Your LinktaFlow title has been updated successfully.',
            'success',
          );
          setActiveUserInput(null);
        } catch (error) {
          handleError(
            error,
            'Unable to update LinktaFlow title. Please try again or check your connection.',
            showNotification,
          );
        }
      }
    },
    [
      activeUserInput,
      setActiveUserInput,
      updateTitleMutation,
      queryClient,
      showNotification,
    ],
  );

  const handleLiktaFlowRegeneration = useCallback(async () => {
    if (activeUserInput) {
      setLoading(true);
      try {
        const response = await regenerateLinktaFlowMutation.mutateAsync({
          input: activeUserInput.input,
        });
        await queryClient.invalidateQueries({ queryKey: ['inputHistory'] });
        showNotification('LinktaFlow generated successfully', 'success');
        navigate(`/output/${response.userInputId}`);
      } catch (error) {
        handleError(
          error,
          'Failed to regenerate LinktaFlow. Please try again.',
          showNotification,
        );
      } finally {
        setLoading(false);
      }
    }
  }, [
    activeUserInput,
    regenerateLinktaFlowMutation,
    queryClient,
    showNotification,
    navigate,
    setLoading,
  ]);

  const handleInputDeletion = useCallback(async () => {
    if (activeUserInput) {
      const userInputId = activeUserInput.id;
      try {
        await deleteInputMutation.mutateAsync(userInputId);
        await queryClient.invalidateQueries({ queryKey: ['inputHistory'] });
        showNotification(
          'Your LinktaFlow and associated input have been deleted successfully.',
          'success',
        );
        // navigate('/generate');
      } catch (error) {
        handleError(
          error,
          "We couldn't delete the LinktaFlow. Please try again or refresh the page.",
          showNotification,
        );
      }
    }
  }, [
    activeUserInput,
    deleteInputMutation,
    queryClient,
    navigate,
    showNotification,
  ]);

  return (
    <>
      <List
        className={styles.userInputList}
        role='list'
      >
        {inputHistory.slice(0, visibleItems).map((userInput) => {
          return (
            <Tooltip
              title={userInput.title}
              key={userInput.id}
              placement='right'
              slotProps={{
                popper: {
                  modifiers: [
                    {
                      name: 'offset',
                      options: {
                        offset: [0, -15],
                      },
                    },
                  ],
                },
              }}
              arrow
            >
              <ListItemButton
                id={userInput.id}
                key={userInput.id}
                onClick={() => handleUserInputSelect(userInput)}
                role='listitem'
                aria-labelledby={`user-input-${userInput.id}`}
                className={`${styles.userInputList__itemButton} ${
                  activeUserInput?.id === userInput.id
                    ? styles.userInputList__itemButtonSelected
                    : ''
                }`}
              >
                <ListItemText
                  primary={
                    <Typography
                      variant='caption'
                      noWrap
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxWidth: '100%', // Ensure max width to trigger ellipsis
                        display: 'block', // Ensure Typography behaves as a block-level element for overflow control
                      }}
                    >
                      {userInput.title}
                    </Typography>
                  }
                  id={`user-input-${userInput.id}`}
                  aria-label={`Details for ${userInput.title}`}
                  className={styles.userInputList__text}
                />

                <IconButton
                  className={styles.userInputList__icon}
                  onClick={handleOptionsIconClick}
                >
                  <MoreVertIcon />
                </IconButton>
              </ListItemButton>
            </Tooltip>
          );
        })}
      </List>
      <OptionsMenu
        arialabelledby={`user-input-button-${activeUserInput?.id}`}
        anchorEl={optionsMenuAnchor}
        isOpen={isOptionsMenuOpen}
        onClose={() => setOptionsMenuAnchor(null)}
        onRename={() => setIsRenamingDialogOpen(true)}
        onRegenerate={handleLiktaFlowRegeneration}
        onDelete={() => setIsDeletionDialogOpen(true)}
      />
      {activeUserInput && (
        <RenameDialog
          isOpen={isRenamingDialogOpen}
          currentTitle={activeUserInput.title}
          onSave={handleTitleUpdate}
          onCancel={() => setIsRenamingDialogOpen(false)}
        />
      )}
      {activeUserInput && (
        <DeleteDialog
          isOpen={isDeletionDialogOpen}
          onDelete={handleInputDeletion}
          onCancel={() => setIsDeletionDialogOpen(false)}
        />
      )}
    </>
  );
};

export default UserInputList;
