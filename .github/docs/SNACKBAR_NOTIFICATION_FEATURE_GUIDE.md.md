## Snackbar Notification Feature Guide

### Overview

The snackbar notification feature provides a way to display temporary messages to users. Notifications stack at the bottom-left of the screen and can be of different types: success, error, info, or warning.

### How to Use

#### Importing the Hook

To use the Snackbar Notification feature, first import the `useNotification` hook:
```typescript

import { useNotification } from '@hooks/useNotification';
```

#### Basic Usage

To display a basic notification, use the `showNotification` function from the `useNotification` hook:

```typescript
const { showNotification } = useNotification();

// Display a success notification
showNotification('Operation successful', 'success');

// Display an error notification
showNotification('An error occurred', 'error');

// Display an info notification
showNotification('New update available', 'info');

// Display a warning notification
showNotification('Low disk space', 'warning');
```

#### Advanced Usage

You can customize the duration and add an action to the notification:

```typescript
showNotification('File uploaded', 'success', {
  duration: 5000, // 5 seconds
  action: {
    label: 'View',
    onClick: () => {
      // Action to perform when 'View' is clicked
    }
  }
});
```

#### Notification Types

- `'success'`: For successful operations
- `'error'`: For error messages
- `'info'`: For informational messages
- `'warning'`: For warning messages

#### Behavior

- Notifications stack from bottom to top
- A maximum of 5 notifications are displayed at once
- Notifications auto-dismiss after 4 seconds by default
- Users can manually dismiss notifications
- A `Dismiss All` button appears when multiple notifications are present

#### Accessibility

Notifications are accessible via keyboard navigation and screen readers. Ensure that all messages are concise and meaningful for screen reader users.

#### Best Practices

- Keep messages concise and clear
- Use appropriate notification types
- Avoid overusing notifications to prevent user fatigue
- For critical information, consider using persistent notifications
