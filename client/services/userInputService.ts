import { axiosClient } from '@config/axios';
import type { UserInput } from '../types';

export const fetchInputHistoryFromApi = async (
  page: number,
  limit: number,
): Promise<UserInput[]> => {
  try {
    const response = await axiosClient.get(`/v1/inputs`, {
      params: { page, limit },
    });
    return response.data.inputHistory || [];
  } catch (error) {
    // TODO: implement logging service
    console.log('Error fetching user inputs:', error);
    return [];
  }
};

export const deleteUserInput = async (id: string) => {
  try {
    const response = await axiosClient.delete(`/v1/inputs/${id}`);
    return response.data;
  } catch (error) {
    // TODO: implement logging service
    // console.error('Error deleting user input:', error);
  }
};
