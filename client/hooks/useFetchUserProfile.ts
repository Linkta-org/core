import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import axiosClient from '@config/axios';
import type { User } from '@/types/user';

const fetchUserProfileFromApi = async (): Promise<User> => {
  try {
    const response = await axiosClient.get('/v1/users');
    return response.data.userProfile;
  } catch (error) {
    throw new Error('Error fetching user profile');
  }
};

// source parameter is temporary - identifies the component where the hook is called
const useFetchUserProfile = (source: string): UseQueryResult<User, Error> => {
  console.log('Query Source: ', source);
  return useQuery<User, Error>({
    queryKey: ['userProfile'],
    queryFn: fetchUserProfileFromApi,
  });
};

export default useFetchUserProfile;
