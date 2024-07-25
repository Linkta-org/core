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
import useFetchUserProfile from './useFetchUserProfile';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();
  const { refetch } = useFetchUserProfile();

  const signOutMutation = useMutation<void, FirebaseError, void>({
    mutationFn: () => signOut(auth),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['userProfile'] });
    },
    onError: (error: FirebaseError) => {
      console.error('Error signing out:', error);
    },
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const profile = await refetch();
        console.log('refetched profile', profile);
        if (profile.data) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [refetch, signOutMutation]);

  return { isAuthenticated, isLoading, signOut: signOutMutation.mutate };
};

export default useAuth;
