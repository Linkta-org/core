import React from 'react';
import type { SxProps, Theme } from '@mui/material';
import { Button } from '@mui/material';
import type { SvgIconComponent } from '@mui/icons-material';

interface PaginationButtonProps {
  onClick: () => void;
  label: string;
  Icon: SvgIconComponent;
  disabled?: boolean;
  customSx?: SxProps<Theme>;
}

const PaginationButton: React.FC<PaginationButtonProps> = ({
  onClick,
  label,
  Icon,
  disabled,
  customSx,
}) => {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      sx={{
        fontSize: '0.5em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        ':focus': {
          outline: '2px solid #000',
        },
        mx: 1,
        ...customSx,
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
