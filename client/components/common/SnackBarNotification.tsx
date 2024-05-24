import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

/**
 * A functional component that displays a notification using MUI Snackbar and Alert components.
 * The Snackbar has 3 ways to close:
 * 1.It will auto close after 6 seconds,
 * 2.By clicking the X icon
 * 3.By pressing the ESC key.
 *
 * @param {object} props - The properties passed to the component.
 * @param {boolean} props.open - Indicates if the snackbar is open.
 * @param {string} props.message - The message to be displayed in the alert.
 * @param {'error' | 'warning' | 'info' | 'success'} props.severity - The severity level of the alert.
 * @returns {JSX.Element} The rendered component.
 */

export default function SnackBarNotification({
  open,
  message,
  severity,
}: {
  open: boolean;
  message: string;
  severity: 'error' | 'warning' | 'info' | 'success';
}) {
  const [isOpen, setOpen] = React.useState(open);
  //the snackbar has 3 ways to close will close after 6 seconds or by clicking X icon or pressing ESC key
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    event?.preventDefault();
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      sx={{ minWidth: 500 }}
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
