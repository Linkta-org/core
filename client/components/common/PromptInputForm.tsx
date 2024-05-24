import React from 'react';
import type { TextFieldProps, ButtonProps } from '@mui/material';
import { TextField, Button } from '@mui/material';
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

const GenerateButton = styled(Button)<ButtonProps>(({ theme }) => ({
  height: 30,
  width: 150,
  color: 'black',
  backgroundColor: theme.palette.secondary.main,
  textTransform: 'none',
}));

const PromptInputForm = () => {
  return (
    <div>
      <h2>Start your learning journey here:</h2>
      <UserInputBar />
      <GenerateButton>Generate</GenerateButton>
    </div>
  );
};

export default PromptInputForm;
