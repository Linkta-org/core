import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { signInWithEmailAndPassword, User } from 'firebase/auth';

import { auth } from '@/firebase/firebaseConfig';

interface CreateUserResult {
  user: User;
  token: string;
}

export const useSignInWithEmailAndPasswordMutation = (): UseMutationResult<
  CreateUserResult,
  Error,
  { email: string; password: string }
> =>
  useMutation<CreateUserResult, Error, { email: string; password: string }>({
    mutationFn: async ({ email, password }) => {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password,
        );
        const user = userCredential.user;
        const token = await user.getIdToken();
        return { user, token };
      } catch (error) {
        throw new Error(`Failed to create user: ${(error as Error).message}`);
      }
    },
  });
