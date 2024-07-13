import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';
import styles from '@styles/layout/DeleteDialog.module.css';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface DeleteDialogProps {
  isOpen: boolean;
  onDelete: () => void;
  onCancel: () => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  isOpen,
  onDelete,
  onCancel,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onCancel}
      classes={{ paper: styles.dialog }}
      aria-labelledby='delete-dialog-title'
      aria-describedby='delete-dialog-description'
    >
      <DialogTitle
        id='delete-dialog-title'
        className={styles.dialogTitle}
      >
        <Box className={styles.titleContainer}>
          <ErrorOutlineIcon className={styles.icon} />
          <Typography className={styles.titleText}>
            Delete This Input
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent
        id='delete-dialog-description'
        className={styles.dialogContent}
      >
        <Box className={styles.textField}>
          <Typography className={styles.boxText}>
            By deleting this input, you are also deleting the Linkta flow
            diagram associated with it. This action cannot be undone.
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions className={styles.buttonGroup}>
        <Button
          onClick={onDelete}
          className={styles.deleteButton}
          aria-label='Delete input'
        >
          <Typography variant='button'>Delete</Typography>
        </Button>
        <Button
          onClick={onCancel}
          className={styles.cancelButton}
          aria-label='Cancel delete'
        >
          <Typography variant='button'>Cancel</Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
