import { useMutation } from '@tanstack/react-query';
import type { UseMutationResult } from '@tanstack/react-query';
import { axiosClient } from '@config/axios';
import type LinktaFlow from '@/types/LinktaFlow';

interface UserInputPayload {
  input: string;
}

// Create LinktaFlow via API call.
const createLinktaFlowInApi = async (
  userInput: UserInputPayload,
): Promise<LinktaFlow> => {
  const uniqueRequestId = crypto.randomUUID();

  const response = await axiosClient.post(
    '/v1/inputs',
    { input: userInput.input },
    {
      headers: {
        'x-request-id': uniqueRequestId,
      },
    },
  );

  return response.data.linktaFlow;
};

/**
 * Custom hook to create a new Linkta flow from user input.
 * @returns {UseMutationResult<LinktaFlow, Error, UserInputPayload, unknown>} - The mutation result with status, error, and mutation functions.
 */
export const useCreateLinktaFlowMutation = (): UseMutationResult<
  LinktaFlow,
  Error,
  UserInputPayload,
  unknown
> => {
  return useMutation<LinktaFlow, Error, UserInputPayload>({
    mutationFn: createLinktaFlowInApi,
  });
};
