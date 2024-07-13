import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { axiosClient } from '@config/axios';
import type {
  UpdateInputTitleParams,
  UpdateInputTitleResponse,
} from '@/types/UserInput';

//  Updates the title of a user input via API call.
const updateInputTitleInApi = async ({
  userInputId,
  newTitle,
}: UpdateInputTitleParams): Promise<UpdateInputTitleResponse> => {
  try {
    const response = await axiosClient.put(`/v1/inputs/${userInputId}`, {
      title: newTitle,
    });
    return response.data;
  } catch (error) {
    throw new Error('Error updating input title');
  }
};

/**
 * Custom hook to update the title of a user input using a mutation.
 * @returns {UseMutationResult<UpdateInputTitleResponse, Error, UpdateInputTitleParams, unknown>} The mutation result.
 */
const useUpdateInputTitleMutation = (): UseMutationResult<
  UpdateInputTitleResponse,
  Error,
  UpdateInputTitleParams,
  unknown
> => {
  return useMutation<
    UpdateInputTitleResponse,
    Error,
    UpdateInputTitleParams,
    unknown
  >({
    mutationFn: updateInputTitleInApi,
  });
};

export default useUpdateInputTitleMutation;
