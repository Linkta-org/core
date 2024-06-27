import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import type { UseMutationResult } from '@tanstack/react-query';

import { MOCK_USER_ID } from '@/mocks';
import type { UserInputPayload, UserInputResponse } from '@/types/UserInput';

export const useNewUserInputMutation = (): UseMutationResult<
  UserInputResponse,
  Error,
  UserInputPayload,
  unknown
> => {
  return useMutation<UserInputResponse, Error, UserInputPayload>({
    mutationFn: async (userInput: UserInputPayload) => {
      const uniqueRequestId = crypto.randomUUID();

      const response = await axios.post(
        'http://localhost:3000/v1/inputs',
        {
          input: userInput.input,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-user-id': MOCK_USER_ID,
            'x-request-id': uniqueRequestId,
            ...userInput.headers,
          },
        },
      );
      return response.data;
    },
  });
};
