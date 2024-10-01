import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, FormControl, FormHelperText } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LinktaDialog from '@components/common/LinktaDialog';
import { userInputTitleSchema } from '@validators/userInputSchemas';
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

  const handleSaveClick = (data: { title: string }) => onSave(data.title);

  const formContent = (
    <form
      onSubmit={handleSubmit(handleSaveClick)}
      className={styles.renameForm}
      aria-live='polite'
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
              fullWidth
              variant='outlined'
              aria-required='true'
              aria-invalid={!!errors.title}
              aria-describedby='title-error'
              className={styles.textField}
            />
          )}
        />
        {errors.title && (
          <FormHelperText
            id='title-error'
            className={styles.formError}
            aria-live='assertive'
          >
            {errors.title.message}
          </FormHelperText>
        )}
      </FormControl>
    </form>
  );

  return (
    <LinktaDialog
      isOpen={isOpen}
      title='Rename Title'
      content={formContent}
      confirmText='Save'
      cancelText='Cancel'
      icon={<EditIcon className={styles.editIcon} />}
      onConfirm={handleSubmit(handleSaveClick)}
      onCancel={() => {
        reset({ title: currentTitle });
        onCancel();
      }}
      confirmButtonClass={styles.renameConfirmButton}
    />
  );
};

export default RenameDialog;
