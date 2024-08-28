import { Box } from '@mui/material';
import React from 'react';
import UserInputForm from './UserInputForm';
import useDocumentTitle from '@hooks/useDocumentTitle';
import PopularTopics from './PopularTopics';
import styles from '@styles/UserInputView.module.css';
import Loader from '@/components/common/Loader';
import useLoadingStore from '@/stores/LoadingStore';

const UserInputView = () => {
  useDocumentTitle('Prompt');
  const isLoading = useLoadingStore((state) => state.isLoading);

  return isLoading ? (
    <Loader />
  ) : (
    <Box className={`${styles.userInputView}`}>
      <UserInputForm />
      <PopularTopics />
    </Box>
  );
};

export default UserInputView;
