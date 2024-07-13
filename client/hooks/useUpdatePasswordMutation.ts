import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { getAuth, confirmPasswordReset } from 'firebase/auth';

type FirebaseAuthResult = void;
type FirebaseAuthVariables = { oobCode: string; password: string };

export const useUpdatePasswordMutation = (): UseMutationResult<
  FirebaseAuthResult,
  Error,
  FirebaseAuthVariables,
  unknown
> => {
  return useMutation<FirebaseAuthResult, Error, FirebaseAuthVariables>({
    mutationFn: async ({ oobCode, password }) => {
      console.log('updatingpassword with code:', oobCode);
      const auth = getAuth();
      await confirmPasswordReset(auth, oobCode, password);
    },
  });
};
