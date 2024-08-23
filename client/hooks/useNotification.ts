import { useNotificationStore } from '@stores/NotificationStore';
import type { NotificationConfig } from '@/types/notification';
import useThrottle from '@hooks/useThrottle';

export const useNotification = () => {
  const { addNotification, removeNotification } = useNotificationStore();

  const throttledAddNotification = useThrottle(addNotification, 200); // Throttling with a 0.2-second delay

  const showNotification = (
    message: string,
    type: 'success' | 'error' | 'info' | 'warning',
    config?: NotificationConfig,
  ) => {
    throttledAddNotification({ message, type, config });
  };

  return {
    showNotification,
    removeNotification,
  };
};
