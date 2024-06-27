import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useMutation } from '@tanstack/react-query';
import type { UseMutationResult } from '@tanstack/react-query';
import type { User } from 'firebase/auth';

import { auth } from '../firebaseConfig';

type CreateUserResult = {
  user: User;
  token: string | undefined;
};

export const useCreateUserWithEmailAndPasswordMutation = (): UseMutationResult<
  CreateUserResult,
  Error,
  { email: string; password: string }
> => {
  return useMutation<
    CreateUserResult,
    Error,
    { email: string; password: string }
  >({
    mutationFn: async ({ email, password }) => {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      const token = await user.getIdToken();
      return { user, token };
    },
  });
};
