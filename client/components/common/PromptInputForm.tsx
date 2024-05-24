import React from 'react';
import { TextField } from '@mui/material';

const PromptInputForm = () => {
  return (
    <div>
      <TextField
        id="user-input"
        variant="outlined"
        color="secondary"
        sx={{
          width: 500,
        }}
      />
    </div>
  );
};

export default PromptInputForm;
