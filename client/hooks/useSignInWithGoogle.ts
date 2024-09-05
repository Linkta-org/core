import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { User } from 'firebase/auth';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@config/firebaseConfig';

type GoogleAuthResult = {
  token: string | undefined;
  user: User;
};

export const useGoogleAuthMutation = (): UseMutationResult<
  GoogleAuthResult,
  Error,
  void,
  unknown
> => {
  return useMutation<GoogleAuthResult, Error, void>({
    mutationFn: async () => {
      const provider = new GoogleAuthProvider();
      provider.addScope('email');
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      const user = result.user;
      return { token, user };
    },
  });
};
