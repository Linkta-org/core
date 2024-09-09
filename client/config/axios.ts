import axios from 'axios';
import { auth } from '@config/firebaseConfig';

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const getFreshToken = async () => {
  const user = auth.currentUser;
  const token = await auth.currentUser?.getIdToken();
  await auth.currentUser?.getIdToken(true);
  if (!token) throw new Error('No ID token available');
  console.log({ user, token });
  return token;
};

axiosClient.interceptors.request.use(async (config) => {
  config.headers.Authorization = `${await getFreshToken()}`;
  return config;
});

export default axiosClient;
