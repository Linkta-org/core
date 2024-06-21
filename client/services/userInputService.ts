import { axiosClient } from '@config/axios';

export const fetchInputHistoryFromApi = async (
  page: number = 1,
  limit: number = 10
) => {
  try {
    const response = await axiosClient.get(`/v1/inputs`, {
      params: { page, limit },
      // headers: {
      //   TODO: to add headers here if needed
      // },
    });
    return response.data.inputHistory || [];
  } catch (error) {
    // TODO: implement logging service
    // console.error('Error fetching user inputs:', error);
    return [];
  }
};
