import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

type FirebaseAuthResult = void;
type FirebaseAuthVariables = string;

export const usePasswordResetMutation = (): UseMutationResult<
  FirebaseAuthResult,
  Error,
  FirebaseAuthVariables,
  unknown
> => {
  return useMutation<FirebaseAuthResult, Error, FirebaseAuthVariables>({
    mutationFn: async (email: string) => {
      console.log('sending password reset email to:', email);
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
    },
  });
};
