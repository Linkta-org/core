import React from 'react';
import { Box, styled } from '@mui/material';
import type { SvgIconComponent } from '@mui/icons-material';

interface PaginationButtonProps {
  onClick: () => void;
  label: string;
  Icon: SvgIconComponent;
}

const StyledButton = styled(Box)({
  fontFamily: 'Roboto, Arial, sans-serif',
  fontSize: '0.6em',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'transparent',
  ':focus': {
    outline: '0.125rem solid #1976d2',
  },
});

const PaginationButton: React.FC<PaginationButtonProps> = ({
  onClick,
  label,
  Icon,
}) => {
  return (
    <StyledButton
      onClick={onClick}
      role="button"
      aria-label={label}
      tabIndex={0}
    >
      <Icon aria-hidden="true" />
      {label}
    </StyledButton>
  );
};

export default PaginationButton;
