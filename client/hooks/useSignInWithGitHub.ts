import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { User } from 'firebase/auth';
import { signInWithPopup, GithubAuthProvider } from 'firebase/auth';
import { auth } from '@config/firebaseConfig';

type GitHubAuthResult = {
  token: string | undefined;
  user: User;
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
      const token = credential?.accessToken;
      const user = result.user;
      console.log({ token, user });
      return { user, token };
    },
  });
};
