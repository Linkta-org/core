import { useRef, useCallback } from 'react';

/**
 * Custom hook to throttle a function
 * @param callback - The function to be throttled.
 * @param delay - The delay in milliseconds for throttling.
 * @returns A throttled version of the callback function.
 */
const useThrottle = <T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number,
): ((...args: T) => void) => {
  // Ref to keep track of the timestamp of the last call
  const lastCallTime = useRef(0);

  return useCallback(
    (...args: T) => {
      const now = Date.now();

      // Check if enough time has passed since the last call
      if (now - lastCallTime.current >= delay) {
        // Update the last call time and invoke the callback with the provided arguments
        lastCallTime.current = now;
        callback(...args);
      }
    },
    [callback, delay],
  );
};

export default useThrottle;
