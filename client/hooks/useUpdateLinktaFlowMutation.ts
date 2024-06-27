import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from '@tanstack/react-query';
import { axiosClient } from '@config/axios';
import type { Node, Edge } from 'reactflow';

interface UpdateLinktaFlowParams {
  linktaFlowId: string;
  updatedLinktaFlow: {
    nodes: Node[];
    edges: Edge[];
  };
}

interface UpdateLinktaFlowResponse {
  message: string;
}

// Updates the LinktaFlow via API call.
const updateLinktaFlowInApi = async ({
  linktaFlowId,
  updatedLinktaFlow,
}: UpdateLinktaFlowParams): Promise<UpdateLinktaFlowResponse> => {
  try {
    const response = await axiosClient.put(`/v1/flows/${linktaFlowId}`, {
      nodes: updatedLinktaFlow.nodes,
      edges: updatedLinktaFlow.edges,
    });
    return response.data;
  } catch (error) {
    throw new Error('Error updating LinktaFlow');
  }
};

/**
 * Custom hook to update the LinktaFlow using a mutation.
 * @returns {UseMutationResult<UpdateLinktaFlowResponse, Error, UpdateLinktaFlowParams, unknown>} The mutation result.
 */
const useUpdateLinktaFlowMutation = (): UseMutationResult<
  UpdateLinktaFlowResponse,
  Error,
  UpdateLinktaFlowParams,
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation<
    UpdateLinktaFlowResponse,
    Error,
    UpdateLinktaFlowParams,
    unknown
  >({
    mutationFn: updateLinktaFlowInApi,

    // On successful mutation, update the cache with the new data from params.
    onSuccess: (_data, variables) => {
      queryClient.setQueryData(
        ['linktaFlow', variables.linktaFlowId],
        variables.updatedLinktaFlow,
      );
    },

    onError: (error: Error) => {
      console.error('Error updating LinktaFlow:', error);
    },
  });
};

export default useUpdateLinktaFlowMutation;
