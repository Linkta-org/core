import { create } from 'zustand';
import type { Notification, NotificationStore } from '@/types/notification';
import { DEFAULT_DURATION, MAX_NOTIFICATIONS } from '@utils/constants';
import { generateUniqueId } from '@utils/helpers';

// Helper function to create a new notification
const createNotification = (
  notification: Omit<Notification, 'id'>,
): Notification => ({
  ...notification,
  id: generateUniqueId(),
  config: {
    duration: DEFAULT_DURATION,
    ...notification.config,
  },
});

// Helper function to set a timeout for a notification
const setNotificationTimeout = (
  id: string,
  duration: number | undefined,
  removeNotification: (id: string) => void,
) => {
  setTimeout(() => {
    removeNotification(id);
  }, duration ?? DEFAULT_DURATION);
};

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],

  addNotification: (notification) =>
    set((state) => {
      const newNotification = createNotification(notification);
      setNotificationTimeout(
        newNotification.id,
        newNotification.config?.duration,
        (id) =>
          set((currentState) => ({
            notifications: currentState.notifications.filter(
              (n) => n.id !== id,
            ),
          })),
      );

      return {
        notifications: [newNotification, ...state.notifications].slice(
          0,
          MAX_NOTIFICATIONS,
        ),
      };
    }),

  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter(
        (notification) => notification.id !== id,
      ),
    })),

  clearAllNotifications: () => set({ notifications: [] }),
}));
