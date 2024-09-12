import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { type User } from 'firebase/auth';
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
        // create a Firebase Auth credential from the email and password
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        // isolate the user object from the credential
        const user = userCredential.user;
        // update the displayName property on the user object
        await updateProfile(user, { displayName: name });
        // get a token from the credential and force a token refresh
        const token = await userCredential.user.getIdToken(true);
        // await userCredential.user.getIdToken(true);
        console.log({ user, token });
        return { user, token };
      } catch (error) {
        throw new Error(`Failed to create user: ${(error as Error).message}`);
      }
    },
  });
};
