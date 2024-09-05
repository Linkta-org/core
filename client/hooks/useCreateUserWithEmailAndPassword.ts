import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth } from '@config/firebaseConfig';

interface CreateUserResult {
  user: User;
  token: string;
}

export const useCreateUserWithEmailAndPasswordMutation = (): UseMutationResult<
  CreateUserResult,
  Error,
  { name: string; email: string; password: string }
> => {
  return useMutation<
    CreateUserResult,
    Error,
    { name: string; email: string; password: string }
  >({
    mutationFn: async ({ name, email, password }) => {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        const user = userCredential.user;
        await updateProfile(user, { displayName: name });
        const token = await user.getIdToken();
        console.log({ token, user });
        return { user, token };
      } catch (error) {
        throw new Error(`Failed to create user: ${(error as Error).message}`);
      }
    },
  });
};
