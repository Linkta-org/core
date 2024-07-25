import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { signInWithPopup, GithubAuthProvider } from 'firebase/auth';

import { auth } from '@/firebase/firebaseConfig';

type GitHubAuthResult = {
  token: string | undefined;
};

export const useGithubAuthMutation = (): UseMutationResult<
  GitHubAuthResult,
  Error,
  void,
  unknown
> => {
  return useMutation<GitHubAuthResult, Error, void>({
    mutationFn: async () => {
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = await credential?.accessToken;
      const user = result.user;
      return { user, token };
    },
  });
};
