import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '@styles/UserInputView.module.css';
import { useCreateLinktaFlowMutation } from '@/hooks/useCreateLinktaFlowMutation';
import SnackBarNotification from '@components/common/SnackBarNotification';
import type { SnackbarSeverity } from '@/types/snackBar';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import useLoadingStore from '@/stores/LoadingStore';
import useUserInputStore from '@/stores/UserInputStore';
interface PopularTopicsProps {}

const PopularTopics: React.FC<PopularTopicsProps> = () => {
  const topicsList = [
    'Data Structures',
    'Renewable Energy',
    'Taxonomy of Living Organisms',
    'Human Body Systems',
    'Computer Networking',
    'Systems Design',
  ];
  const navigate = useNavigate();
  const createLinktaFlowMutation = useCreateLinktaFlowMutation();
  const queryClient = useQueryClient();
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] =
    useState<SnackbarSeverity>('success');

  const resetSnackbarStates = () => {
    setIsSnackbarOpen(false);
    setSnackbarMessage('');
    setSnackbarSeverity('success');
  };

  const setLoading = useLoadingStore((state) => state.setLoading);
  const isChecked = useUserInputStore((state) => state.isChecked);

  const handleClickTopic = async (index: number) => {
    try {
      setLoading(true);
      const response = await createLinktaFlowMutation.mutateAsync({
        input: topicsList[index],
      });
      await queryClient.invalidateQueries({ queryKey: ['inputHistory'] });
      navigate(`/output/${response.userInputId}`);
      setLoading(false);
    } catch (error) {
      console.error('Failed to create LinktaFlow: ', error);
      let errorMessage = 'Failed to create LinktaFlow. Please try again.';

      if (error instanceof AxiosError && error.response) {
        errorMessage = error.response.data || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      setIsSnackbarOpen(true);
      setSnackbarMessage(errorMessage);
      setSnackbarSeverity('error');
      setLoading(false);
    }
  };

  return (
    <>
      <Box className={`${styles.popularTopics}`}>
        <Typography
          variant='h6'
          className={`${styles.topicsHeading}`}
        >
          Popular Topics
        </Typography>
        {topicsList.map((topic, i) => (
          <Button
            variant='outlined'
            className={`${styles.topicsButton}`}
            key={`topic-button-${i}`}
            onClick={() => handleClickTopic(i)}
            disabled={!isChecked}
          >
            <Typography
              variant='body1'
              color='textPrimary'
              className='topic-data'
              id={`topic-${i}`}
            >
              {topic}
            </Typography>
          </Button>
        ))}
      </Box>
      <SnackBarNotification
        open={isSnackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        callerUpdater={resetSnackbarStates}
      />
    </>
  );
};

export default PopularTopics;
