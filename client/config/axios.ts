import axios from 'axios';
import { auth } from '@config/firebaseConfig';

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(async (config) => {
  // get the Firebase Auth token and send with all requests to server
  const idToken = await auth.currentUser?.getIdToken();
  // TODO: trigger a snack bar?
  if (!idToken) throw new Error('No ID token available');
  // add token to Authorization header
  config.headers.Authorization = `${idToken}`;
  return config;
});

export default axiosClient;
