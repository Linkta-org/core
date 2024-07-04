import React, { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Typography,
  FormControl,
  FormHelperText,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from '@styles/layout/RenameDialog.module.css';
import { userInputTitleSchema } from '@validators/userInputSchemas';

interface RenameDialogProps {
  isOpen: boolean;
  currentTitle: string;
  onSave: (newTitle: string) => void;
  onCancel: () => void;
}

interface FormData {
  title: string;
}

const RenameDialog: React.FC<RenameDialogProps> = ({
  isOpen,
  currentTitle,
  onSave,
  onCancel,
}) => {
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userInputTitleSchema),
    defaultValues: { title: currentTitle },
  });

  useEffect(() => {
    setValue('title', currentTitle);
  }, [currentTitle, setValue]);

  const handleSaveClick = (data: FormData) => {
    onSave(data.title);
  };

  const handleCancelClick = () => {
    reset({ title: currentTitle });
    onCancel();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleCancelClick}
      classes={{ paper: styles.dialog }}
      aria-labelledby='rename-dialog-title'
      aria-describedby='rename-dialog-description'
    >
      <DialogTitle
        id='rename-dialog-title'
        className={styles.dialogTitle}
      >
        <Typography>Current Title:</Typography>
      </DialogTitle>
      <DialogContent
        id='rename-dialog-description'
        className={styles.dialogContent}
      >
        <FormControl
          error={!!errors.title}
          fullWidth
        >
          <Controller
            name='title'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin='none'
                label=''
                type='text'
                fullWidth
                variant='outlined'
                className={styles.textField}
                aria-required='true'
                aria-invalid={!!errors.title}
              />
            )}
          />
          {errors.title && (
            <FormHelperText
              error
              id='title-error-text'
            >
              {errors.title.message}
            </FormHelperText>
          )}
        </FormControl>
      </DialogContent>
      <DialogActions className={styles.buttonGroup}>
        <Button
          onClick={handleCancelClick}
          className={styles.cancelButton}
          aria-label='Cancel renaming'
        >
          <Typography variant='button'>Cancel</Typography>
        </Button>
        <Button
          onClick={handleSubmit(handleSaveClick)}
          className={styles.saveButton}
          aria-label='Save new title'
        >
          <Typography variant='button'>Save</Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RenameDialog;
