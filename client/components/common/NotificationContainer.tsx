import React from 'react';
import { useNotificationStore } from '@stores/NotificationStore';
import SnackBarNotification from '@components/common/SnackBarNotification';
import { Button, Box } from '@mui/material';

const NotificationContainer: React.FC = () => {
  const { notifications, removeNotification, clearAllNotifications } =
    useNotificationStore();

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 24,
        left: 24,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        maxHeight: 'calc(100vh - 48px)',
        overflowY: 'hidden',
      }}
    >
      {notifications.length > 1 && (
        <Button
          onClick={clearAllNotifications}
          variant='contained'
          sx={{ mb: 2, zIndex: notifications.length + 1 }}
        >
          Dismiss All
        </Button>
      )}
      <Box>
        {notifications.map((notification, index) => (
          <Box
            key={notification.id}
            sx={{
              position: 'relative',
              marginTop: index !== 0 ? '-15px' : 0,
              zIndex: notifications.length - index,
            }}
          >
            <SnackBarNotification
              {...notification}
              onClose={() => removeNotification(notification.id)}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default NotificationContainer;
