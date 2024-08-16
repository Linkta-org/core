import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import axiosClient from '@config/axios';
import type { UserProfileResponse } from '@/types/user';

const fetchUserProfileFromApi = async (): Promise<UserProfileResponse> => {
  try {
    const response = await axiosClient.get('/v1/users');

    // Check if response is a string (error message)
    if (typeof response.data === 'string') {
      return response.data;
    }

    // Otherwise, return the user profile
    return { userProfile: response.data.userProfile };
  } catch (error) {
    throw new Error('Error fetching user profile');
  }
};

const useFetchUserProfile = (): UseQueryResult<UserProfileResponse, Error> => {
  return useQuery<UserProfileResponse, Error>({
    queryKey: ['userProfile'],
    queryFn: fetchUserProfileFromApi,
  });
};

export default useFetchUserProfile;
