export const extractUserInputId = (id: string): string => id.split('-')[0];

// Unique Id generator
let notificationCounter = 0;

export const generateUniqueId = (): string => {
  const timestamp = Date.now();
  notificationCounter += 1;
  return `${timestamp}-${notificationCounter}`;
};
