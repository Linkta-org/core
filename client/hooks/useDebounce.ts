import { useCallback, useRef } from 'react';

/**
 * Custom hook to debounce a function
 * @param callback - The function to be debounced.
 * @param delay - The delay in milliseconds for debouncing.
 * @returns A debounced version of the callback function.
 */
const useDebounce = <T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number,
): ((...args: T) => void) => {
  // Ref to store the timeout ID
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    (...args: T) => {
      // Clear the previous timeout if it exists
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set a new timeout
      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null; // Reset the timeoutId before execution
        callback.apply(this, args);
      }, delay);
    },
    [callback, delay],
  );
};

export default useDebounce;
