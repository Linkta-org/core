import React from 'react';
import { Button } from '@mui/material';
import type { SvgIconComponent } from '@mui/icons-material';

interface PaginationButtonProps {
  onClick: () => void;
  label: string;
  Icon: SvgIconComponent;
  disabled?: boolean;
}

export const PaginationButton: React.FC<PaginationButtonProps> = ({
  onClick,
  label,
  Icon,
  disabled,
}) => {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      sx={{
        width: '70%',
        fontSize: '0.7em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
      }}
      startIcon={<Icon />}
      disabled={disabled}
    >
      {label}
    </Button>
  );
};
