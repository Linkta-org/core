import { Box, Button, Typography } from '@mui/material';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '@styles/UserInputView.module.css';
import { useCreateLinktaFlowMutation } from '@/hooks/useCreateLinktaFlowMutation';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import useLoadingStore from '@/stores/LoadingStore';
import useUserInputStore from '@/stores/UserInputStore';
import { useNotification } from '@hooks/useNotification';
import useDebounce from '@hooks/useDebounce';

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
  const { showNotification } = useNotification();

  const isLoading = useLoadingStore((state) => state.isLoading);
  const setLoading = useLoadingStore((state) => state.setLoading);
  const isChecked = useUserInputStore((state) => state.isChecked);

  const handleClickTopic = useCallback(
    async (index: number) => {
      setLoading(true);
      try {
        const response = await createLinktaFlowMutation.mutateAsync({
          input: topicsList[index],
        });
        await queryClient.invalidateQueries({ queryKey: ['inputHistory'] });
        navigate(`/output/${response.userInputId}`);
        showNotification('LinktaFlow created successfully.', 'success');
      } catch (error) {
        console.error('Failed to create LinktaFlow: ', error);
        let errorMessage =
          'Unable to create LinktaFlow. Please check your input and try again.';

        if (error instanceof AxiosError && error.response) {
          errorMessage = error.response.data || errorMessage;
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }

        showNotification(errorMessage, 'error', {
          duration: 6000,
          action: {
            label: 'Retry',
            onClick: () => debouncedHandleClickTopic(index),
          },
        });
      } finally {
        setLoading(false);
      }
    },
    [
      createLinktaFlowMutation,
      queryClient,
      navigate,
      showNotification,
      setLoading,
      topicsList,
    ],
  );

  const debouncedHandleClickTopic = useDebounce(handleClickTopic, 500);

  return (
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
          onClick={() => debouncedHandleClickTopic(i)}
          disabled={!isChecked || isLoading}
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
  );
};

export default PopularTopics;
