import {
  useMutation,
  useQuery,
  type UseMutationResult,
  type UseQueryResult,
} from '@tanstack/react-query';
import axiosClient from '@config/axios';
import type { User } from '@/types/user';

const getExistingUserProfile = async (): Promise<User> => {
  try {
    const response = await axiosClient.get('/v1/users');
    console.log('USER RESPONSE: ', response);
    return response.data.userProfile;
  } catch (error) {
    throw new Error('Error fetching user profile');
  }
};

const postNewUserProfile = async (): Promise<User> => {
  try {
    const response = await axiosClient.post('/v1/users');
    console.log('USER RESPONSE: ', response);
    return response.data.newUserProfile;
  } catch (error) {
    throw new Error('Error creating user profile');
  }
};

const putExistingUserProfile = async (): Promise<User> => {
  try {
    const response = await axiosClient.put('/v1/users');
    console.log('USER RESPONSE: ', response);
    return response.data.updatedUserProfile;
  } catch (error) {
    throw new Error('Error updating user profile');
  }
};

// source parameter is temporary - identifies the component where the hook is called
/**
 * custom hook to fetch user profile from server
 * @param source
 * @returns User
 */
const useFetchUserProfile = (source: string): UseQueryResult<User, Error> => {
  console.log('Query Source: ', source);

  return useQuery<User, Error>({
    queryKey: ['getUserProfile'],
    queryFn: getExistingUserProfile,
  });
};

/**
 * Custom hook to create a new user profile on the database
 * @param source
 * @returns User
 */
const useCreateUserProfile = (
  source: string,
): UseMutationResult<User, Error, void, unknown> => {
  console.log('Mutation Source: ', source);

  return useMutation<User, Error, void>({
    mutationKey: ['createUserProfile'],
    mutationFn: postNewUserProfile,
  });
};

/**
 * Custom hook to update a user profile on the database
 * @param source
 * @returns User
 */
const useUpdateUserProfile = (
  source: string,
): UseMutationResult<User, Error, void, unknown> => {
  console.log('Mutation Source: ', source);

  return useMutation<User, Error, void>({
    mutationKey: ['updateUserProfile'],
    mutationFn: putExistingUserProfile,
  });
};

export { useFetchUserProfile, useCreateUserProfile, useUpdateUserProfile };
