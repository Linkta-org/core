import { Box } from '@mui/material';
import React from 'react';
import UserInputForm from './UserInputForm';
import useDocumentTitle from '@hooks/useDocumentTitle';
import PopularTopics from './PopularTopics';
import styles from '@styles/UserInputView.module.css'

const UserInputView = () => {
  useDocumentTitle('Prompt');
  return (
    <Box className={`${styles.userInputView} user-input-view`}>
      <UserInputForm />
      <PopularTopics />
    </Box>
  );
};

export default UserInputView;
