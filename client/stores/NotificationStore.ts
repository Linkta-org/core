import { create } from 'zustand';

export type NotificationConfig = {
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
};

export type Notification = {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  config?: NotificationConfig;
};

type NotificationStore = {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
};

const DEFAULT_DURATION = 4000;
const MAX_NOTIFICATIONS = 5;

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  addNotification: (notification) =>
    set((state) => {
      const newNotification = {
        ...notification,
        id: Date.now().toString(),
        config: {
          duration: DEFAULT_DURATION,
          ...notification.config,
        },
      };

      setTimeout(() => {
        set((currentState) => ({
          notifications: currentState.notifications.filter(
            (n) => n.id !== newNotification.id,
          ),
        }));
      }, newNotification.config.duration);

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
