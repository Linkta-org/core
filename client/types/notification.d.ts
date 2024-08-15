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

export type NotificationStore = {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
};
