import React from 'react';
import { useNotificationStore } from '@stores/NotificationStore';
import SnackBarNotification from '@components/common/SnackBarNotification';
import { Button, Box } from '@mui/material';
import styles from '@styles/NotificationContainer.module.css';

/**
 * Container for displaying notifications.
 * Allows dismissing individual notifications or all at once.
 */
const NotificationContainer: React.FC = () => {
  const { notifications, removeNotification, clearAllNotifications } =
    useNotificationStore();

  return (
    <Box className={styles.notificationContainer}>
      {notifications.length > 1 && (
        <Button
          onClick={clearAllNotifications}
          variant='contained'
          className={styles.dismissAllButton}
        >
          Dismiss All
        </Button>
      )}
      <Box>
        {notifications.map((notification, index) => (
          <Box
            key={notification.id}
            className={`${styles.notificationItem} ${index !== 0 ? styles.notificationItemSpacing : ''}`}
            style={
              {
                '--notification-z-index': notifications.length - index,
              } as React.CSSProperties
            }
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
