import React from 'react';
import { Box } from '@mui/material';
import styles from '@client/styles/layout/PaginationButton.module.css';
import type { SvgIconComponent } from '@mui/icons-material';

interface PaginationButtonProps {
  onClick: () => void;
  label: string;
  Icon: SvgIconComponent;
}

const PaginationButton: React.FC<PaginationButtonProps> = ({
  onClick,
  label,
  Icon,
}) => {
  return (
    <Box
      onClick={onClick}
      role="button"
      aria-label={label}
      tabIndex={0}
      className={styles.paginationButton}
    >
      <Icon
        aria-hidden="true"
        className={styles.paginationButton_icon}
      />
      {label}
    </Box>
  );
};

export default PaginationButton;
