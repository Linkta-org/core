import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { axiosClient } from '@config/axios';
import type LinktaFlow from '../types/LinktaFlow';

const fetchLinktaFlowFromApi = async (
  userInputId: string,
): Promise<LinktaFlow> => {
  try {
    const response = await axiosClient.get(`/v1/flows/${userInputId}`);

    return response.data.linktaFlow;
  } catch (error) {
    throw new Error('Error fetching LinktaFlow');
  }
};

const useFetchLinktaFlow = (
  userInputId: string,
): UseQueryResult<LinktaFlow, Error> => {
  return useQuery<LinktaFlow, Error>({
    queryKey: ['linktaFlow', userInputId],
    queryFn: () => fetchLinktaFlowFromApi(userInputId),
    enabled: !!userInputId,
  });
};

export default useFetchLinktaFlow;
