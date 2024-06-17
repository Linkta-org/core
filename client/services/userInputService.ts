import { axiosClient } from '@config/axios';
import { MOCK_USER_ID } from '@/mocks';

export const fetchInputHistoryFromApi = async (
  page: number = 1,
  limit: number = 10
) => {
  const userId = MOCK_USER_ID; // TODO: Temp solution for testing before auth feature is implemented

  try {
    const response = await axiosClient.get(`/v1/inputs`, {
      params: { page, limit },
      headers: {
        'x-user-id': userId,
      },
    });
    return response.data.userInputs || [];
  } catch (error) {
    // TODO: implement logging service
    // console.error('Error fetching user inputs:', error);
    return [];
  }
};
