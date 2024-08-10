import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import type { Notification } from '@/types/notification';
import styles from '@styles/SnackBarNotification.module.css';

type SnackBarNotificationProps = Omit<Notification, 'id'> & {
  onClose: () => void;
};

/**
 * Displays a snackbar notification with an optional action button.
 *
 * @param {object} props - Component props.
 * @param {string} props.message - Notification message.
 * @param {'success' | 'info' | 'warning' | 'error'} props.type - Notification type.
 * @param {object} [props.config] - Additional configuration.
 * @param {number} [props.config.duration] - Auto-hide duration in milliseconds.
 * @param {object} [props.config.action] - Action button configuration.
 * @param {string} props.config.action.label - Action button label.
 * @param {function} props.config.action.onClick - Action button click handler.
 * @param {function} props.onClose - Callback to handle notification close.
 */
const SnackBarNotification: React.FC<SnackBarNotificationProps> = ({
  message,
  type,
  config,
  onClose,
}) => {
  /**
   * Handles the close event of the Snackbar.
   *
   * @param {React.SyntheticEvent | Event} event - Event object.
   * @param {string} [reason] - Reason for closing.
   */
  const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    onClose();
  };

  return (
    <Snackbar
      open={true}
      autoHideDuration={config?.duration}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      className={styles.snackbarNotification}
    >
      <Alert
        onClose={handleClose}
        severity={type}
        variant='outlined'
        className={styles.alert}
        action={
          config?.action && (
            <Button
              size='small'
              onClick={config.action.onClick}
              aria-label={`${config.action.label} for notification: ${message}`}
              className={styles.alert__actionButton}
            >
              {config.action.label}
            </Button>
          )
        }
        role='alert'
        aria-live='polite'
        tabIndex={0}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBarNotification;
