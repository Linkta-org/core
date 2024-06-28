/**
 * Custom hook to manage authentication state.
 * @returns {object} - An object containing:
 *   - `isAuthenticated`: Boolean indicating whether the user is currently authenticated.
 *   - `isLoading`: Boolean indicating if the authentication status check is in progress.
 */

import { auth } from '@/firebase/firebaseConfig';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { isAuthenticated, isLoading };
};

export default useAuth;
