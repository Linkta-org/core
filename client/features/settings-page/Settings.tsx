import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Box, Typography, TextField, Button } from '@mui/material';
import styles from '@styles/SettingsPage.module.css';
import {
  useFetchUserProfile,
  useUpdateUserProfile,
} from '@hooks/useUserCrudOperations';
import { zodResolver } from '@hookform/resolvers/zod';
import { userDisplayNameSchema } from '@validators/validateUserDisplayName';
import { useQueryClient } from '@tanstack/react-query';
import useDebounce from '@hooks/useDebounce';
import { useNotification } from '@hooks/useNotification';
import Loader from '@components/common/Loader';
import { handleError } from '@utils/errorHandler';

interface UserProfileFormData {
  name: string;
}

const Settings: React.FC = () => {
  const { showNotification } = useNotification();

  const queryClient = useQueryClient();
  const { data: userProfile, fetchStatus } =
    useFetchUserProfile('Settings Page');

  const isFetching = fetchStatus === 'fetching';

  const updateUserProfile = useUpdateUserProfile('Settings Page');

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<UserProfileFormData>({
    resolver: zodResolver(userDisplayNameSchema),
    defaultValues: {
      name: userProfile?.name,
    },
  });

  useEffect(() => {
    if (userProfile) reset({ name: userProfile.name });
  }, [userProfile, reset]);

  const nameValue = watch('name');

  const onSubmit = async (data: UserProfileFormData) => {
    try {
      await updateUserProfile.mutateAsync(data);

      await queryClient.invalidateQueries({ queryKey: ['getUserProfile'] });

      showNotification('Display name updated successfully', 'success');
    } catch (error) {
      console.log(error);
      handleError(
        error,
        'Unable to update profile. Please try again.',
        showNotification,
      );
    }
  };

  const debouncedSubmit = useDebounce(onSubmit, 500);

  return isFetching ? (
    <Loader />
  ) : (
    <form
      onSubmit={handleSubmit(debouncedSubmit)}
      className={styles['settings-form-container']}
      aria-labelledby='settings-page-title'
      aria-describedby='form-description'
    >
      <Typography
        variant='h4'
        className={styles['settings-page-title']}
      >
        Settings
      </Typography>

      <Box className={styles['settings-field-group']}>
        <Typography className={styles['settings-field-label']}>
          Display Name:
        </Typography>
        <Controller
          name='name'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              variant='outlined'
              className={styles['settings-text-field']}
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : ''}
              aria-labelledby='name-label'
              aria-invalid={!!errors.name}
              aria-required='true'
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
          )}
        />
        <Button
          type='submit'
          variant='contained'
          className={styles['settings-submit-btn']}
          disabled={nameValue === userProfile?.name}
          aria-label='Update display name'
        >
          Update
        </Button>
      </Box>
    </form>
  );
};

export default Settings;
