import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getAuth, signOut } from 'firebase/auth';
import type { FirebaseError } from 'firebase/app';

const useSignOut = (): UseMutationResult<void, FirebaseError, void> => {
  const auth = getAuth();
  const queryClient = useQueryClient();

  return useMutation<void, FirebaseError, void>({
    mutationFn: () => signOut(auth),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['userProfile'] });
    },
    onError: (error: FirebaseError) => {
      console.error('Error signing out:', error);
    },
  });
};

export default useSignOut;
