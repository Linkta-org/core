import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { getAuth, signOut } from 'firebase/auth';
import type { FirebaseError } from 'firebase/app';

const useSignOut = (): UseMutationResult<void, FirebaseError, void> => {
  const auth = getAuth();

  return useMutation<void, FirebaseError, void>({
    mutationFn: () => signOut(auth),
    onSuccess: () => {
      console.log('Signed out successfully');
      // TODO: eventually we will need to invalidate the userInfo query if we want to get user info from the db
      // queryClient.invalidateQueries(['user']);
    },
    onError: (error: FirebaseError) => {
      console.error('Error signing out:', error);
    },
  });
};

export default useSignOut;
