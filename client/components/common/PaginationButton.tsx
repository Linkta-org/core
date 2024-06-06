import React from 'react';
import type { SxProps, Theme } from '@mui/material';
import { Button, styled } from '@mui/material';
import type { SvgIconComponent } from '@mui/icons-material';

interface PaginationButtonProps {
  onClick: () => void;
  label: string;
  Icon: SvgIconComponent;
  disabled?: boolean;
  customSx?: SxProps<Theme>;
}

const StyledButton = styled(Button)({
  fontSize: '0.8em',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'transparent',
  ':focus': {
    outline: '2px solid #1976d2',
  },
  margin: 8,
});

const PaginationButton: React.FC<PaginationButtonProps> = ({
  onClick,
  label,
  Icon,
  disabled,
  customSx,
}) => {
  return (
    <StyledButton
      onClick={onClick}
      variant="contained"
      startIcon={<Icon aria-hidden="true" />}
      disabled={disabled}
      aria-label={label}
      sx={customSx}
    >
      {label}
    </StyledButton>
  );
};

export default PaginationButton;
