import React from 'react';
import { Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import LinktaDialog from '@components/common/LinktaDialog';
import styles from '@styles/layout/DeleteDialog.module.css';

interface DeleteDialogProps {
  isOpen: boolean;
  currentTitle: string;
  onDelete: () => void;
  onCancel: () => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  isOpen,
  currentTitle,
  onDelete,
  onCancel,
}) => {
  const content = (
    <Typography className={styles.deleteText}>
      Are you sure you want to delete{' '}
      <Typography
        component='span'
        fontWeight='bold'
      >
        {currentTitle}
      </Typography>
      ?
    </Typography>
  );

  return (
    <LinktaDialog
      isOpen={isOpen}
      title='Delete Input'
      content={content}
      confirmText='Delete'
      cancelText='Cancel'
      icon={<ErrorOutlineIcon className={styles.deleteIcon} />}
      onConfirm={onDelete}
      onCancel={onCancel}
      confirmButtonClass={styles.deleteConfirmButton}
    />
  );
};

export default DeleteDialog;
