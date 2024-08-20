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
 * @returns {function} Cleanup function to clear the timeout.
 */
const setNotificationTimeout = (
  id: string,
  duration: number | undefined,
  removeNotification: (id: string) => void,
) => {
  const timeoutId = setTimeout(() => {
    removeNotification(id);
  }, duration ?? DEFAULT_DURATION);

  // Function to clear the timeout to prevent memory leaks
  return () => clearTimeout(timeoutId);
};

/**
 * Zustand store for managing notifications with automatic timeout handling.
 *
 * @type {NotificationStore}
 */
export const useNotificationStore = create<NotificationStore>((set) => {
  const notificationTimeouts = new Map<string, () => void>();

  return {
    notifications: [],

    /**
     * Add a new notification to the store and schedules its removal.
     *
     * @param {Omit<Notification, 'id'>} notification - The notification details excluding the ID.
     */
    addNotification: (notification) =>
      set((state) => {
        if (state.notifications.length >= MAX_NOTIFICATIONS) {
          return state;
        }

        const newNotification = createNotification(notification);

        // Set a timeout to automatically remove the notification after its duration
        const cleanup = setNotificationTimeout(
          newNotification.id,
          newNotification.config?.duration,
          (id) => {
            set((currentState) => ({
              notifications: currentState.notifications.filter(
                (n) => n.id !== id,
              ),
            }));
            // Remove the timeout from the map after cleanup
            notificationTimeouts.delete(id);
          },
        );

        // Store the cleanup function for later use
        notificationTimeouts.set(newNotification.id, cleanup);

        // Add the new notification to the state
        return {
          notifications: [newNotification, ...state.notifications],
        };
      }),

    /**
     * Remove a notification by ID and clears its timeout.
     *
     * @param {string} id - Notification ID.
     */
    removeNotification: (id) =>
      set((state) => {
        const cleanup = notificationTimeouts.get(id);

        if (cleanup) {
          cleanup();
          notificationTimeouts.delete(id);
        } else {
          console.warn(`No timeout found for notification with id ${id}`);
        }

        return {
          notifications: state.notifications.filter(
            (notification) => notification.id !== id,
          ),
        };
      }),

    /**
     * Clears all notifications and their timeouts.
     */
    clearAllNotifications: () =>
      set(() => {
        // Iterate over all timeouts and clear them
        notificationTimeouts.forEach((cleanup) => cleanup());
        // Clear the entire map of timeouts
        notificationTimeouts.clear();

        // Clear all notifications from the state
        return { notifications: [] };
      }),
  };
});
