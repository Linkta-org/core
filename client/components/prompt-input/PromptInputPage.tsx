import { Box } from '@mui/material';
import React from 'react';
import PromptInputForm from './PromptInputForm';
import PromptInputInstructions from './PromptInputInstructions';
import useDocumentTitle from '@hooks/useDocumentTitle';

const PromptInputPage = () => {
  useDocumentTitle('Prompt');
  return (
    <Box className='prompt-input-view'>
      <PromptInputForm />
      <PromptInputInstructions />
    </Box>
  );
};

export default PromptInputPage;
