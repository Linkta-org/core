import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import { auth } from '@/firebase/firebaseConfig';

type GoogleAuthResult = {
  token: string | undefined;
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
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await result.user.getIdToken();
      return { token, user };
    },
  });
};
