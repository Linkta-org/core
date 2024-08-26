import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import axiosClient from '@config/axios';
import type { User } from '@/types/user';

// interface CreateUserProfileParams {
//   name: string;
// }

// API call for creating a new user profile
const createUserProfileInApi = async (name: string): Promise<User> => {
  try {
    console.log('AXIOS NAME: ', name);
    const response = await axiosClient.post('/v1/users', name);
    console.log('Response from create user profile from API: ', response.data);
    return response.data.newUserProfile;
  } catch (error) {
    throw new Error('Error creating user');
  }
};

/**
 * Custom hook to create a new user using a mutation.
 * @returns {UseMutationResult<CreateUserResponse, Error, CreateUserProfileParams, unknown>} The mutation result.
 */
const useCreateUserProfileMutation = (): UseMutationResult<
  User,
  Error,
  string,
  unknown
> => {
  return useMutation<User, Error, string, unknown>({
    mutationFn: createUserProfileInApi,
  });
};

export default useCreateUserProfileMutation;
