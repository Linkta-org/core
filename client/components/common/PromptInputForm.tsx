import React from 'react';
import type { TextFieldProps } from '@mui/material';
import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const UserInputBar = styled(TextField)<TextFieldProps>(({ theme }) => ({
  width: 500,
  color: theme.palette.secondary.main,
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.secondary.main,
    },
    '& input': {
      backgroundColor: theme.palette.grey[200],
    },
  },
}));

const PromptInputForm = () => {
  return (
    <div>
      <h2>Start your learning journey here:</h2>
      <UserInputBar />
    </div>
  );
};

export default PromptInputForm;
