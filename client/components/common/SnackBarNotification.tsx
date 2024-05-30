import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

/**
 * A functional component that displays a notification using MUI Snackbar and Alert components.
 * The Snackbar has 3 ways to close:
 * 1. It will auto close after {duration} miliseconds - default is 4000ms
 * 2. By clicking the X icon
 * 3. By pressing the ESC key.
 *
 * @param {object} props - The properties passed to the component.
 * @param {boolean} props.open - Indicates if the snackbar is open.
 * @param {string} props.message - The message to be displayed in the alert.
 * @param {'error' | 'warning' | 'info' | 'success'} props.severity - The severity level of the alert.
 * @param {number} props.duration - The time in miliseconds that the alert remains visible.
 * @param {function} props.callerUpdater - A callback passed from the caller, which updates the 'alert is open' state on the caller
 * @returns {JSX.Element} The rendered component.
 */

type SnackBarNotificationProps = {
  open: boolean;
  message: string;
  severity: 'error' | 'warning' | 'info' | 'success';
  duration?: number;
  callerUpdater: () => void;
};

export default function SnackBarNotification({
  open,
  message,
  severity,
  duration,
  callerUpdater,
}: SnackBarNotificationProps) {
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    event?.preventDefault();
    if (reason === 'clickaway') {
      return;
    }
    callerUpdater();
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration || 4000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      sx={{ minWidth: 500 }}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="outlined"
        sx={{
          width: '100%',
          bgcolor: 'background.paper',
          color: 'background.default',
          textAlign: 'center',
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
