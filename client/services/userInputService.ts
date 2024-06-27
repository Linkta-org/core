import { axiosClient } from '@config/axios';

export const deleteUserInput = async (id: string) => {
  try {
    const response = await axiosClient.delete(`/v1/inputs/${id}`);
    return response.data;
  } catch (error) {
    // TODO: implement logging service
    // console.error('Error deleting user input:', error);
  }
};
