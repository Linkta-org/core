import React from 'react';
import { Button, Box } from '@mui/material';
import { useNotification } from '@hooks/useNotification';
import { useNotificationStore } from '@stores/NotificationStore';

const TestNotifications: React.FC = () => {
  const { showNotification } = useNotification();
  const clearAllNotifications = useNotificationStore(
    (state) => state.clearAllNotifications,
  );

  const triggerMultipleNotifications = () => {
    showNotification('This is a success message', 'success');
    showNotification('This is an error message', 'error');
    showNotification('This is a warning message', 'warning');
    showNotification('This is an info message', 'info');
  };

  return (
    <Box>
      <Button onClick={triggerMultipleNotifications}>
        Trigger Multiple Notifications
      </Button>
      <Button onClick={clearAllNotifications}>Clear All Notifications</Button>
    </Box>
  );
};

export default TestNotifications;
