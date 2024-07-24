/**
 * Custom hook to manage authentication state.
 * @returns {object} - An object containing:
 *   - `isAuthenticated`: Boolean indicating whether the user is currently authenticated.
 *   - `isLoading`: Boolean indicating if the authentication status check is in progress.
 *   - `signOut`: A  mutationfunction to sign out the user.
 */

import { auth } from '@/firebase/firebaseConfig';
import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { FirebaseError } from 'firebase/app';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();

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

  const signOutMutation = useMutation<void, FirebaseError, void>({
    mutationFn: () => signOut(auth),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['userProfile'] });
    },
    onError: (error: FirebaseError) => {
      console.error('Error signing out:', error);
    },
  });

  return { isAuthenticated, isLoading, signOut: signOutMutation.mutate };
};

export default useAuth;
