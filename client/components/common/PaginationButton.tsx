import React from 'react';
import { Button } from '@mui/material';
import type { SvgIconComponent } from '@mui/icons-material';

interface PaginationButtonProps {
  onClick: () => void;
  label: string;
  Icon: SvgIconComponent;
  disabled?: boolean;
}

const PaginationButton: React.FC<PaginationButtonProps> = ({
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
        ':focus': {
          outline: '2px solid #000',
        },
      }}
      startIcon={<Icon aria-hidden="true" />}
      disabled={disabled}
      aria-label={label}
    >
      {label}
    </Button>
  );
};

export default PaginationButton;
