import { create } from 'zustand';
import type { Notification, NotificationStore } from '@/types/notification';
import { DEFAULT_DURATION, MAX_NOTIFICATIONS } from '@utils/constants';
import { generateUniqueId } from '@utils/helpers';

/**
 * Helper function to create a new notification with a unique ID and default configuration.
 *
 * @param {Omit<Notification, 'id'>} notification - The notification details excluding the ID.
 * @returns {Notification} The newly created notification with a unique ID.
 */
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

/**
 * Helper function to set a timeout for a notification to be removed after a specified duration.
 *
 * @param {string} id - The ID of the notification.
 * @param {number | undefined} duration - The duration after which the notification should be removed.
 * @param {function} removeNotification - The function to remove the notification.
 */
const setNotificationTimeout = (
  id: string,
  duration: number | undefined,
  removeNotification: (id: string) => void,
) => {
  const timeoutId = setTimeout(() => {
    removeNotification(id);
  }, duration ?? DEFAULT_DURATION);

  return () => clearTimeout(timeoutId);
};

/**
 * Zustand store for managing notifications.
 *
 * @type {NotificationStore}
 */
export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],

  /**
   * Add a new notification to the store.
   *
   * @param {Omit<Notification, 'id'>} notification - The notification details excluding the ID.
   */
  addNotification: (notification) =>
    set((state) => {
      if (state.notifications.length >= MAX_NOTIFICATIONS) {
        return state;
      }

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
        notifications: [newNotification, ...state.notifications],
      };
    }),

  /**
   * Remove a notification from the store by ID.
   *
   * @param {string} id - The ID of the notification to be removed.
   */
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter(
        (notification) => notification.id !== id,
      ),
    })),

  // Clear all notifications from the store.
  clearAllNotifications: () => set({ notifications: [] }),
}));
