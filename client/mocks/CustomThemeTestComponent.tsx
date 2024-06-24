import React from 'react';
import { Box, Button, Typography, styled } from '@mui/material';
import styles from './CustomThemeTestComponent.module.css';

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.secondary,
  '&:hover': {
    backgroundColor: theme.palette.background.default,
  },
}));

const CustomThemeTestComponent = () => {
  return (
    <Box
      sx={{
        padding: '16px',
        backgroundColor: 'var(--background-default)',
      }}
    >
      <Typography
        variant='h4'
        gutterBottom
        sx={{ color: 'text-secondary' }}
      >
        Test Component for Custom Theme
      </Typography>

      {/* MUI Button with sx prop */}
      <Button
        sx={{
          color: 'text-secondary',
          '&:hover': {
            backgroundColor: 'var(--hover-background-color)',
          },
        }}
      >
        Hover Button
      </Button>

      {/* MUI Button with styled component */}
      <StyledButton>Styled Hover Button</StyledButton>

      {/* Non-MUI Button with CSS Module */}
      <div className={styles.testContainer}>
        <p className={styles.testText}>
          This is a test component to check the custom theme styles in module
          CSS.
        </p>
        <button className={styles.testButton}>Test Button</button>
      </div>
    </Box>
  );
};

export default CustomThemeTestComponent;
