import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { axiosClient } from '@config/axios';
import type { UpdateInputTitleResponse } from '@/types/UserInput';

// Deletes a user input via API call.
const deleteUserInputFromApi = async (userInputId: string) => {
  try {
    const response = await axiosClient.delete(`/v1/inputs/${userInputId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error deleting input');
  }
};

/**
 * Custom hook to delete a user input using a mutation.
 * @returns {UseMutationResult<UpdateInputTitleResponse, Error, string, unknown>} The mutation result.
 */
const useDeleteInputMutation = (): UseMutationResult<
  UpdateInputTitleResponse,
  Error,
  string,
  unknown
> => {
  return useMutation<UpdateInputTitleResponse, Error, string, unknown>({
    mutationFn: deleteUserInputFromApi,
  });
};

export default useDeleteInputMutation;
