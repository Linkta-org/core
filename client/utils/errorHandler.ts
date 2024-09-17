import { AxiosError } from 'axios';

type ShowNotificationFunction = (
  message: string,
  variant: 'error',
  options?: {
    duration?: number;
    action?: {
      label: string;
      onClick: () => void;
    };
  },
) => void;

export const handleError = (
  error: unknown,
  defaultMessage: string,
  showNotification: ShowNotificationFunction,
  retryAction?: () => void,
) => {
  let errorMessage = defaultMessage;

  if (error instanceof AxiosError && error.response?.data) {
    errorMessage =
      typeof error.response.data === 'string'
        ? error.response.data
        : error.response.data.message || defaultMessage;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  showNotification(errorMessage, 'error', {
    duration: 6000,
    ...(retryAction && {
      action: {
        label: 'Retry',
        onClick: retryAction,
      },
    }),
  });
};
