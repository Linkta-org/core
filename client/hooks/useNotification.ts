import {
  useNotificationStore,
  type NotificationConfig,
} from '@stores/NotificationStore';

export const useNotification = () => {
  const { addNotification } = useNotificationStore();

  const showNotification = (
    message: string,
    type: 'success' | 'error' | 'info' | 'warning',
    config?: NotificationConfig,
  ) => {
    addNotification({ message, type, config });
  };

  return { showNotification };
};
