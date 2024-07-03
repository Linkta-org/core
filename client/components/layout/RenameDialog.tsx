import React, { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';
import styles from '@styles/layout/RenameDialog.module.css';

interface RenameDialogProps {
  isOpen: boolean;
  currentTitle: string;
  onSave: (newTitle: string) => void;
  onCancel: () => void;
}

const RenameDialog: React.FC<RenameDialogProps> = ({
  isOpen,
  currentTitle,
  onSave,
  onCancel,
}) => {
  const [newTitle, setNewTitle] = useState<string>(currentTitle);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setNewTitle(currentTitle);
  }, [currentTitle]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleSaveClick = () => {
    onSave(newTitle);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onCancel}
      classes={{ paper: styles.dialog }}
    >
      <DialogTitle className={styles.dialogTitle}>Current Input:</DialogTitle>
      <DialogContent>
        <TextField
          inputRef={inputRef}
          margin='dense'
          label=''
          type='text'
          fullWidth
          variant='outlined'
          value={newTitle}
          onChange={handleTitleChange}
          className={styles.textField}
        />
      </DialogContent>
      <DialogActions className={styles.buttonGroup}>
        <Button
          onClick={onCancel}
          color='secondary'
          className={styles.cancelButton}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSaveClick}
          color='primary'
          className={styles.saveButton}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RenameDialog;
